import Big from 'big-integer';
import Dexie from 'dexie';

import { hash } from './crypto.js';
import { forks, params } from './config.js';
import {
  string_to_array,
  array_to_string,
  integer_to_array,
} from './format.js';

function hash2integer(hash, offset) {
  function hash2integer2(h, i, n) {
    var x = h[i];

    if (x === 0) {
      return hash2integer2(h, i + 1, n + 256 * 8);
    } else {
      return n + hash2integer3(x, h[i + 1]);
    }
  }

  function dec2bin(dec) {
    var n = dec.toString(2);
    n = '00000000'.substr(n.length) + n;
    return n;
  }

  function hash2integer3(byte1, byte2) {
    var x = dec2bin(byte1).concat(dec2bin(byte2));

    return hash2integer4(x, 0, 0);
  }

  function hash2integer4(binary, i, n) {
    var x = binary[i];

    if (x === '0') {
      return hash2integer4(binary, i + 1, n + 256);
    } else {
      var b2 = binary.slice(i + offset, i + 8 + offset);
      var y = hash2integer5(b2) + n;

      return y;
    }
  }

  function hash2integer5(bin) {
    var x = 0;

    for (var i = 0; i < bin.length; i++) {
      var y = bin[i];

      if (y === '0') {
        x = x * 2;
      } else {
        x = 1 + x * 2;
      }
    }

    return x;
  }

  return hash2integer2(hash.concat([255]), 0, 0);
}

function log2(x) {
  if (x.eq(Big.zero)) {
    return Big.one;
  } else if (x.eq(Big.one)) {
    return Big.one;
  } else {
    return Big.one.plus(log2(x.divide(Big(2))));
  }
}

function exponent(a, b) {
  //a is type bigint. b is an int.
  if (b === 0) {
    return Big.one;
  } else if (b === 1) {
    return a;
  } else if (b % 2 === 0) {
    return exponent(a.times(a), Math.floor(b / 2));
  } else {
    return a.times(exponent(a, b - 1));
  }
}

export function sci2int(x) {
  function pair2int(a, b) {
    const c = exponent(Big(2), a); //c is a bigint
    return c.times(256 + b).divide(256);
    //return Math.floor((c * (256 + b)) / 256);
  }

  function sci2pair(i) {
    var a = Math.floor(i / 256);
    var b = i % 256;
    return [a, b];
  }
  return pair2int(...sci2pair(x));
}

export function int2sci(x) {
  function pair2sci(a, b) {
    return 256 * a + b;
  }
  function int2pair(x) {
    var a = log2(x) - 1;
    var c = exponent(Big(2), a);
    var b = Number(
      x
        .times(256)
        .divide(c)
        .minus(256),
    );
    //var b = Math.floor((x * 256) / c) - 256;
    return [a, b];
  }
  return pair2sci(...int2pair(x));
}

export default class Headers {
  constructor(rpc, events) {
    this.rpc = rpc;
    this.events = events;
    this.headers = {};

    this.top_difficulty = 0;
  }

  init = async () => {
    const db = new Dexie('veodb');
    db.version(1).stores({ headers: 'header_hash,acc_difficulty' });
    this.db = db;

    const top_header = await db.headers
      .orderBy('acc_difficulty')
      .reverse()
      .limit(1)
      .first();

    if (top_header !== undefined) {
      this.top_header = top_header.header;
    } else {
      this.top_header = [
        'header',
        28001,
        'f3PfnlxML/UPF9T5ixy1+Q539NyOVfFG07x4pf3zw6Q=',
        '4A7MYFe5u7OG22QGUvIFguzZWYWndkZARGdImbhbEjM=',
        'huIlyyrALPoafVluEL/ZYtZ8BXHUJEPxcXCLid5CSnU=',
        141617794,
        14053,
        3,
        'AAAAAAAAAAAA6ZeG6UQ+dPE+8iEbHoY92if6pIMAAlI=',
        193346798808507350000,
        5982,
      ];

      await this.writeHeader(this.top_header, 1865656952131054);
    }

    this.height = this.top_header[1];
    this.events.emit('header', this.top_header);
  };

  syncHeaders = async () => {
    const headers = await this.rpc.getHeaders(this.height + 1, 2501);

    if (!headers.length) {
      setTimeout(this.syncHeaders, 60000);
    } else {
      this.height = headers[headers.length - 1][1];

      for (let idx = 0; idx < headers.length; idx++) {
        try {
          await this.absorbHeader(headers[idx]);
          this.events.emit('header', headers[idx]);
        } catch (e) {
          console.error(e);
        }
      }

      setTimeout(this.syncHeaders, 3000);
    }
  };

  difficultyShouldBe = async (next_header, prev_header_hash) => {
    const header = await this.readHeader(prev_header_hash);

    if (header === undefined) {
      console.log('Received an orphan header: ' + prev_header_hash);
      throw Error('unknown parent');
    } else {
      const diff = header[6];
      const RF = params.retarget_frequency;
      const height = header[1];

      let x;
      if (height > forks.four) {
        x = height % Math.floor(RF / 2);
      } else {
        x = height % RF;
      }

      const prev_ewah = await this.readEWAH(prev_header_hash);
      const ewah = this.calcEWAH(next_header, header, prev_ewah);

      if (height > forks.seven) {
        return [this.newTarget(header, ewah), ewah];
      } else if (x === 0 && !(height < 10)) {
        return [this.difficultyShouldBe2(header), ewah];
      } else {
        return [diff, ewah];
      }
    }
  };

  calcEWAH(header, prev_header, prev_ewah0) {
    const prev_ewah = Big.max(1, prev_ewah0);
    const DT = header[5] - prev_header[5];
    const Hashrate0 = Big.max(
      Big.one,
      Big(params.hashrate_converter)
        .times(sci2int(prev_header[6]))
        .divide(DT),
    );
    const N = 20;
    const Converter = prev_ewah.times(1024000);
    const EWAH2 = Converter.times(N - 1).divide(prev_ewah);
    const EWAH0 = Converter.divide(Hashrate0).add(EWAH2);
    const ewah = Number(Converter.times(N).divide(EWAH0));

    return ewah;
  }

  newTarget(header, ewah0) {
    const ewah = Big.max(ewah0, 1);
    const diff = header[6];
    const hashes = sci2int(diff);
    const estimate = Number(
      Big.max(1, hashes.times(params.hashrate_converter).divide(ewah)),
    );

    const P = header[10];
    const UL = Math.floor((P * 6) / 4);
    const LL = Math.floor((P * 3) / 4);
    let ND = diff;

    if (estimate > UL) {
      ND = this.PoWRecalculate(diff, UL, estimate);
    } else if (estimate < LL) {
      ND = this.PoWRecalculate(diff, LL, estimate);
    }

    return Math.max(ND, params.initial_difficulty);
  }

  PoWRecalculate(diff0, threshold, estimate) {
    const old = sci2int(diff0);
    const n = old.times(threshold).divide(estimate);
    const d = int2sci(n);

    return Math.max(1, d);
  }

  checkPoW = async header => {
    const height = header[1];
    if (height < 2) return { valid: true, ewah: 1000000 };
    else {
      const previous_hash = string_to_array(atob(header[2]));
      const [diff0, ewah] = await this.difficultyShouldBe(
        header,
        previous_hash,
      );

      const diff = header[6];
      if (diff === diff0) {
        const nonce = atob(header[8]);

        const data_header = header.slice(0);
        data_header[8] = btoa(array_to_string(integer_to_array(0, 32)));

        const serialized = this.serializeHeader(data_header);
        const header_hash = hash(hash(serialized));

        let I;
        if (height >= forks.two) {
          const nonce2 = nonce.slice(-23);
          I = hash2integer(
            hash(header_hash.concat(string_to_array(nonce2))),
            1,
          );
        } else {
          // const data = pack("32cB32c", header_hash diff, nonce)
          const data = header_hash
            .concat(integer_to_array(diff, 2))
            .concat(string_to_array(nonce));
          I = hash2integer(hash(data), 0);
        }

        return { valid: I > diff, ewah };
      } else {
        console.error('Bad diff! diff: ' + diff + ' diff0: ' + diff0);
        return { valid: false, ewah: 0 };
      }
    }
  };

  serializeHeader(x) {
    var height = x[1]; //4 bytes
    var prev_hash = atob(x[2]); //bin
    var trees_hash = atob(x[3]); //bin
    var txs_proof_hash = atob(x[4]); //bin
    var time = x[5]; //4 bytes
    var difficulty = x[6]; // 3 bytes
    var version = x[7]; // 2 bytes
    var nonce = atob(x[8]); // 32 bytes
    var period = x[10];

    return string_to_array(prev_hash)
      .concat(integer_to_array(height, 4))
      .concat(integer_to_array(time, 5))
      .concat(integer_to_array(version, 2))
      .concat(string_to_array(trees_hash))
      .concat(string_to_array(txs_proof_hash))
      .concat(integer_to_array(difficulty, 2))
      .concat(string_to_array(nonce))
      .concat(integer_to_array(period, 2));
  }

  getTopHeader(isSerialized = false) {
    if (!isSerialized) {
      return this.top_header;
    } else {
      return this.serializeHeader(this.top_header);
    }
  }

  readHeader = async header_hash => {
    const record = await this.db.headers.get(header_hash);
    if (record !== undefined) return record.header;
    else return undefined;
  };

  writeHeader = async (header, ewah) => {
    const header_hash = hash(this.serializeHeader(header));

    const acc_difficulty = header[9];
    if (acc_difficulty > this.top_difficulty) {
      this.top_difficulty = acc_difficulty;
      this.top_header = header;
    }

    this.db.headers.put({ header_hash, acc_difficulty, header, ewah });
  };

  readEWAH = async header_hash => {
    const record = await this.db.headers.get(header_hash);
    if (record !== undefined) return record.ewah;
    else return undefined;
  };

  absorbHeader = async header => {
    const { valid, ewah } = await this.checkPoW(header);
    if (valid) {
      const height = header[1];

      if (height === 0) {
        header[9] = 0;
      } else {
        const prev_hash = string_to_array(atob(header[2]));
        const prev_header = await this.readHeader(prev_hash);
        const prev_accum_diff = prev_header[9];
        const diff = header[6];
        const accum_diff = sci2int(diff);
        header[9] = prev_accum_diff + accum_diff - 1;
      }

      await this.writeHeader(header, ewah);
    } else {
      throw Error('Bad header: ' + JSON.stringify(header));
    }
  };
}
