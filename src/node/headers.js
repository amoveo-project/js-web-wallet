import { hash } from "./crypto.js";
import { forks } from "./config.js";
import { string_to_array, array_to_string, integer_to_array } from "./format.js";


function hash2integer(hash, offset) {
  function hash2integer2(h, i, n) {
    var x = h[i];
    if  ( x == 0 ) {
      return hash2integer2(h, i+1, n+(256*8));
    } else {
      return n + hash2integer3(x, h[i+1]);
    }
  }
  function dec2bin(dec){
    const n = (dec).toString(2);
    n="00000000".substr(n.length)+n;
    return n;
  }
  function hash2integer3(byte1, byte2) {
    var x = dec2bin(byte1).concat(dec2bin(byte2));
    return hash2integer4(x, 0, 0);
  }
  function hash2integer4(binary, i, n) {
    var x = binary[i];
    if ( x == "0" ) { return hash2integer4(binary, i+1, n+256); }
    else {
      var b2 = binary.slice(i + offset, i + 8 + offset);
      var y = hash2integer5(b2) + n;
      return y;
    }
  }
  function hash2integer5(bin) {
    var x = 0;
    for (var i=0; i < bin.length; i++) {
      var y = bin[i];
      if ( y == "0" ) { x = x * 2; }
      else { x = 1 + (x * 2); }
    }
    return x;
  }
  return hash2integer2(hash.concat([255]), 0, 0);
}

function bigInt(n) { return n; }

function log2(x) {
  if (x.eq(0)) { return 1; }
  else if (x.eq(1)) { return 1; }
  //if (x == 1) { return 1; }
  else { return 1 + log2(x.divide(2)); }
  //else { return 1 + log2(Math.floor(x / 2))}
}
function exponent(a, b) {//a is type bigint. b is an int.
  if (b == 0) { return bigInt(1); }
  else if (b == 1) { return a; }
  else if ((b % 2) == 0) {return exponent(a.times(a), Math.floor(b / 2)); }
  else {return a.times(exponent(a, b-1)); }
}

function sci2int(x) {
  return x;
}

export default class Headers {
  constructor(rpc, events) {
    this.rpc = rpc;
    this.events = events;
    this.headers = {};

    this.height = 28001;
  }

  syncHeaders = async() => {
    const headers = await this.rpc.getHeaders(this.height + 1, 5001);

    if (!headers.length) {
      setTimeout(this.syncHeaders, 60000);

    } else {
      this.height = headers[headers.length - 1][1];

      headers.map(header => {
        try {
          this.absorbHeader(header);
          this.events.emit('header', header);
        } catch (e) {
          console.error(e);
        }
      });

      setTimeout(this.syncHeaders, 3000);
    }
  }

  checkPoW(header) {
    const height = header[1];
    if (height < 2)
      return { valid: true, ewah: 1000000};
    else {
      const previous_hash = string_to_array(atob(header[2]));
      const { diff0, ewah } = difficulty_should_be(header, previous_hash);
      const diff = header[6];
      if (diff === diff0) {
        const nonce = atob(header[8]);
        header[8] = btoa(array_to_string(integer_to_array(0, 32)));
        const serialized = this.serializeHeader(header);
        const header_hash = hash(hash(serialized));

        let I;
        if (height >= forks.two) {
          const nonce2 = nonce.slice(-23);
          I = hash2integer(hash(
            header_hash.concat(string_to_array(nonce2))
          ), 1);

        } else {
          // const data = pack("32cB32c", header_hash diff, nonce)
          const data = header_hash
            .concat(integer_to_array(diff, 2))
            .concat(string_to_array(nonce));
          I = hash2integer(hash(data), 0);
        }

        return {valid: I > diff, ewah};
      } else {
        console.error("Bad diff! diff: " + diff + " diff0: " + diff0);
        return {valid: false, ewah: 0};
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

    var y = string_to_array(prev_hash);
    return y.concat(
      integer_to_array(height, 4)).concat(
        integer_to_array(time, 5)).concat(
          integer_to_array(version, 2)).concat(
            string_to_array(trees_hash)).concat(
              string_to_array(txs_proof_hash)).concat(
                integer_to_array(difficulty, 2)).concat(
                  string_to_array(nonce)).concat(
                    integer_to_array(period, 2));
  };

  readHeader(header_hash) {
    return this.headers[header_hash][0];
  }

  writeHeader(header, ewah) {
    const header_hash = hash(this.serializeHeader(header));
    this.headers[header_hash] = [header, ewah];
  }

  absorbHeader = function(header) {
    const { valid, ewah } = this.checkPoW(header);
    if (valid) {
      const height = header[1];
      const header_hash = hash(this.serializeHeader(header));
      if (height == 0) {
        header[9] = 0;
      } else {
        const prev_hash = this.string_to_array(atob(header[2]));
        const prev_header = header; //this.read_header(prev_hash);
        const prev_accum_diff = prev_header[9];
        const diff = header[6];
        const accum_diff = sci2int(diff);
        header[9] = prev_accum_diff + accum_diff - 1;
      }

      this.writeHeader(header);

    } else {
      throw Error("Bad header: " + JSON.stringify(header));
    }
  }
};
