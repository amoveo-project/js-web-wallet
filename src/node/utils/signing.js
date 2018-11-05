import { hash } from './crypto';
import { integerToArray, stringToArray } from './format';

export function serialize(data) {
  let d0, rest;

  if (Number.isInteger(data)) {
    // console.log("serialize integer");
    // <<3:8, X:512>>;

    return integerToArray(3, 1).concat(integerToArray(data, 64));
  } else if (Array.isArray(data)) {
    if (data[0] === -6) {
      // its a list.
      // console.log("serialize array");
      // <<1:8, S:32, A/binary>>;
      d0 = data.slice(1);
      rest = serialize_list(d0);

      return integerToArray(1, 1)
        .concat(integerToArray(rest.length, 4))
        .concat(rest);
    } else if (data[0] === -7) {
      // it is a tuple
      // console.log("serialize tuple 1");
      // <<2:8, S:32, A/binary>>;
      d0 = data.slice(1);
      rest = serialize_list(d0);

      return integerToArray(2, 1)
        .concat(integerToArray(rest.length, 4))
        .concat(rest);
    } else if (typeof data[0] === 'string') {
      // assume it is a record. a tuple where the first element is an atom. This is the only place that atoms can occur.
      // console.log("serialize tuple 2");
      var h = data[0];
      d0 = data.slice(1);

      // <<4:8, S:32, A/binary>>;

      var atom_size = h.length;
      var first = integerToArray(4, 1)
        .concat(integerToArray(atom_size, 4))
        .concat(stringToArray(h));

      // console.log(JSON.stringify(first));

      rest = first.concat(serialize_list(d0));

      return integerToArray(2, 1)
        .concat(integerToArray(rest.length, 4))
        .concat(rest);
    }
  }

  // assume it is a binary
  // console.log("serialize binary");
  // <<0:8, S:32, X/binary>>;
  if (typeof data == 'string') {
    rest = stringToArray(atob(data));
    return integerToArray(0, 1)
      .concat(integerToArray(rest.length, 4))
      .concat(rest);
  } else {
    return integerToArray(0, 1)
      .concat(integerToArray(data.length, 4))
      .concat(data);
  }
  function serialize_list(l) {
    var m = [];

    for (var i = 0; i < l.length; i++) {
      m = m.concat(serialize(l[i]));
    }

    return m;
  }
}

export function sign(data, key) {
  // ecdsa, sha356
  const d2 = serialize(data);
  const h = hash(d2);
  const sig = key.sign(h);

  return sig.toDER();
}
