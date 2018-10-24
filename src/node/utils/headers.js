import Big from 'big-integer';

export function hash2integer(hash, offset) {
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
