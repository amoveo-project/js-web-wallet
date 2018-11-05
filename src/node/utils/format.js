export function stringToArray(x) {
  const a = new Uint8Array(x.length);

  for (let i = 0; i < x.length; i++) {
    a[i] = x.charCodeAt(i);
  }

  return Array.from(a);
}

export function integerToArray(i, size) {
  const a = [];

  for (let b = 0; b < size; b++) {
    a.push(((i % 256) + 256) % 256);
    i = Math.floor(i / 256);
  }

  return a.reverse();
}

export function arrayToString(x) {
  let a = '';

  for (var i = 0; i < x.length; i++) {
    a += String.fromCharCode(x[i]);
  }

  return a;
}

export function hexToString(h) {
  let s = '';

  for (var i = 0; 2 * i < h.length; i++) {
    const m = h.slice(2 * i, 2 * (i + 1));
    const n = parseInt(m, 16);
    const l = String.fromCharCode(n);

    s = s.concat(l);
  }

  return s;
}

export function treeNumber2Value(t) {
  if (t < 101) {
    return t;
  } else {
    var top = 101;
    var bottom = 100;
    var t2 = t - 100;
    var x = tree_number_det_power(10000, top, bottom, t2);
    return Math.floor(x / 100);
  }
}
function tree_number_det_power(base, top, bottom, t) {
  if (t == 1) {
    return Math.floor((base * top) / bottom);
  }
  var r = Math.floor(t % 2);
  if (r == 1) {
    var base2 = Math.floor((base * top) / bottom);
    return tree_number_det_power(base2, top, bottom, t - 1);
  } else if (r == 0) {
    var top2 = Math.floor((top * top) / bottom);
    return tree_number_det_power(base, top2, bottom, Math.floor(t / 2));
  }
}
function parse_address(A) {
  //remove spaces or periods. " " "."
  const A2 = A.replace(/\ /g, '');
  const A3 = A2.replace(/\./g, '');
  const A4 = A3.replace(/\n/g, '');
  //if it is the wrong length, make an error.
  //88
  const B = A4.length == 88;
  if (B) {
    return A4;
  } else {
    return 0;
  }
}
