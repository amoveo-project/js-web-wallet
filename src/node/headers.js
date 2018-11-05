import Big from 'big-integer';
import Dexie from 'dexie';

import { hash } from './utils/crypto';
import { forks, params } from './config';
import {
  arrayToString,
  integerToArray,
  stringToArray,
} from './utils/format.js';
import { hashToInteger, intToSci, sciToInt } from './utils/headers';

export default class Headers {
  constructor(rpc, events) {
    this.rpc = rpc;
    this.events = events;
    this.headers = {};

    this.top_difficulty = 0;
  }

  init = async (offset = 0) => {
    const db = new Dexie('veodb');
    db.version(1).stores({ headers: 'header_hash,acc_difficulty' });
    this.db = db;

    const top_header = await db.headers
      .orderBy('acc_difficulty')
      .reverse()
      .limit(2)
      .offset(offset)
      //.first();
      .toArray();

    // TODO: there are cases when top header is broken somehow
    // then we need to offset headers by one until we find the header
    // with child we know from full node headers

    if (top_header !== undefined) {
      this.top_header = top_header[0].header;
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
      console.log(
        'Received an orphan header: ' + prev_header_hash,
        next_header,
      );
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
        .times(sciToInt(prev_header[6]))
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
    const hashes = sciToInt(diff);
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
    const old = sciToInt(diff0);
    const n = old.times(threshold).divide(estimate);
    const d = intToSci(n);

    return Math.max(1, d);
  }

  checkPoW = async header => {
    const height = header[1];
    if (height < 2) return { valid: true, ewah: 1000000 };
    else {
      const previous_hash = stringToArray(atob(header[2]));
      const [diff0, ewah] = await this.difficultyShouldBe(
        header,
        previous_hash,
      );

      const diff = header[6];
      if (diff === diff0) {
        const nonce = atob(header[8]);

        const data_header = header.slice(0);
        data_header[8] = btoa(arrayToString(integerToArray(0, 32)));

        const serialized = this.serializeHeader(data_header);
        const header_hash = hash(hash(serialized));

        let I;
        if (height >= forks.two) {
          const nonce2 = nonce.slice(-23);
          I = hashToInteger(hash(header_hash.concat(stringToArray(nonce2))), 1);
        } else {
          // const data = pack("32cB32c", header_hash diff, nonce)
          const data = header_hash
            .concat(integerToArray(diff, 2))
            .concat(stringToArray(nonce));
          I = hashToInteger(hash(data), 0);
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

    return stringToArray(prev_hash)
      .concat(integerToArray(height, 4))
      .concat(integerToArray(time, 5))
      .concat(integerToArray(version, 2))
      .concat(stringToArray(trees_hash))
      .concat(stringToArray(txs_proof_hash))
      .concat(integerToArray(difficulty, 2))
      .concat(stringToArray(nonce))
      .concat(integerToArray(period, 2));
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
        const prev_hash = stringToArray(atob(header[2]));
        const prev_header = await this.readHeader(prev_hash);
        const prev_accum_diff = prev_header[9];
        const diff = header[6];
        const accum_diff = sciToInt(diff);
        header[9] = prev_accum_diff + accum_diff - 1;
      }

      await this.writeHeader(header, ewah);
    } else {
      throw Error('Bad header: ' + JSON.stringify(header));
    }
  };
}
