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
