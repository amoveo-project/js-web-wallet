import { hash } from './utils/crypto';
import { arrayToString, integerToArray, stringToArray } from './utils/format';

export default class MerkleProofs {
  constructor(rpc, headers_object) {
    this.headers = headers_object;
    this.rpc = rpc;
  }

  request_proof(tree, key) {
    var top_hash = hash(this.headers.getTopHeader(true));

    return this.rpc
      .getProof(btoa(tree), key, btoa(arrayToString(top_hash)))
      .then(proof => this.verify(key, proof));
  }

  hash_member(hash, members) {
    for (var i = 0; i < 6; i++) {
      var h2 = members.slice(32 * i, 32 * (i + 1));
      //console.log("check that hash is a member");
      var b = this.check_equal(hash, h2);
      if (b) {
        return true;
      }
    }

    return false;
  }

  check_equal(a, check_b) {
    for (var i = 0; i < a.length; i++) {
      if (!(a[i] === check_b[i])) {
        return false;
      }
    }

    return true;
  }

  link_hash(l) {
    var h = [];

    for (var i = 1; i < l.length; i++) {
      //console.log(link[i]);
      var x = stringToArray(atob(l[i]));
      h = x.concat(h);
    }

    return hash(h);
  }

  chain_links(chain) {
    for (var i = 1; i < chain.length; i++) {
      var parent = chain[i - 1];
      var child = chain[i];
      var lh = this.link_hash(child);
      var chain_links_b = this.chain_links_array_member(parent, lh);

      if (chain_links_b === false) {
        return false;
      }
      //out = out && chain_links_array_member(parent, lh);
    }

    return true;
  }

  chain_links_array_member(parent, h) {
    for (var i = 1; i < parent.length; i++) {
      var x = parent[i];
      var p = stringToArray(atob(x));
      var b = this.check_equal(p, h);

      if (b) {
        return true;
      }
    }

    return false;
  }

  leaf_hash(v, trie_key) {
    var serialized = this.serialize_key(v, trie_key).concat(
      this.serialize(v, trie_key),
    );

    //console.log("hashed leaf");
    //console.log(JSON.stringify(serialized));
    return hash(serialized);
  }

  verify(trie_key, x) {
    //x is {return tree_roots, tree_root, value, proof_chain}
    var tree_roots = stringToArray(atob(x[1]));
    var header_trees_hash = stringToArray(atob(this.headers.getTopHeader()[3]));
    var hash_tree_roots = hash(tree_roots);
    var check = this.check_equal(header_trees_hash, hash_tree_roots);

    if (!check) {
      console.log(
        "the hash of tree roots doesn't match the hash in the header.",
      );
    } else {
      var tree_root = stringToArray(atob(x[2]));
      var check2 = this.hash_member(tree_root, tree_roots);

      if (!check2) {
        console.log('that tree root is not one of the valid tree roots.');
      } else {
        var chain = x[4].slice(1);

        chain.reverse();

        var h = this.link_hash(chain[0]);
        var check3 = this.check_equal(h, tree_root);
        var check4 = this.chain_links(chain);

        if (!check3) {
          console.log("the proof chain doesn't link to the tree root");
        } else if (!check4) {
          console.log('the proof chain has a broken link');
        } else {
          var last = chain[chain.length - 1];
          var value = x[3];
          var lh = this.leaf_hash(value, trie_key);
          var check5 = this.chain_links_array_member(last, lh);

          if (check5) {
            return value;
            //we should learn to deal with proofs of empty data.
          } else {
            console.log("the value doesn't match the proof");
            console.log(x);
            console.log(trie_key);

            throw new Error('bad');
          }
        }
      }
    }
  }

  serialize_key(v, trie_key) {
    var t = v[0];

    if (t === 'gov') {
      return integerToArray(trie_key, 8);
    } else if (t === 'acc') {
      //console.log("v is ");
      //console.log(v);
      var pubkey = stringToArray(atob(v[3]));
      return hash(pubkey);
    } else if (t === 'channel') {
      //return hash(integerToArray(v[1], 32));
      return hash(stringToArray(atob(v[1])));
    } else if (t === 'oracle') {
      //return hash(integerToArray(v[1], 32));
      return hash(stringToArray(atob(v[1])));
    } else {
      //console.log("type is ");
      //console.log(t);
      //console.log(v);
      throw new Error('serialize trie bad trie type');
    }
  }

  serialize(v, trie_key) {
    //console.log("serialize tree element");
    //console.log(JSON.stringify(v));
    //console.log(trie_key);
    var t = v[0];

    let serialized, nonce, id;

    if (t === 'gov') {
      id = integerToArray(v[1], 1);
      var value = integerToArray(v[2], 2);
      var lock = integerToArray(v[3], 1);

      serialized = []
        .concat(id)
        .concat(value)
        .concat(lock);

      return serialized;
    } else if (t === 'acc') {
      var balance = integerToArray(v[1], 6);
      var pubkey = stringToArray(atob(v[3]));
      var bets = stringToArray(atob(v[5]));
      nonce = integerToArray(v[2], 3);

      serialized = []
        .concat(balance)
        .concat(nonce)
        .concat(pubkey)
        .concat(bets);

      return serialized;
    } else if (t === 'channel') {
      //var cid = integerToArray(v[1], 32);
      var cid = stringToArray(atob(v[1]));
      var acc1 = stringToArray(atob(v[2]));
      var acc2 = stringToArray(atob(v[3]));
      var bal1 = integerToArray(v[4], 6);
      var bal2 = integerToArray(v[5], 6);
      var amount = integerToArray(128, 1).concat(integerToArray(v[6], 5));
      var last_modified = integerToArray(v[8], 4);
      var delay = integerToArray(v[9], 4);
      var closed = integerToArray(v[11], 1);

      nonce = integerToArray(v[7], 4);

      serialized = []
        .concat(cid)
        .concat(bal1)
        .concat(bal2)
        .concat(amount)
        .concat(nonce)
        .concat(last_modified)
        .concat(delay)
        .concat(closed)
        .concat(acc1)
        .concat(acc2);

      return serialized;
    } else if (t === 'oracle') {
      //var id = integerToArray(v[1], 32);
      //var id = stringToArray(v[1], 32);
      //console.log("serialize oracle ");
      //console.log(JSON.stringify(v));
      id = stringToArray(atob(v[1]));
      var result = integerToArray(v[2], 1);
      var type = integerToArray(v[5], 1);
      var starts = integerToArray(v[4], 4);
      var done_timer = integerToArray(v[9], 4); //height_bits/8 bytes
      var governance = integerToArray(v[10], 1); //one byte
      var governance_amount = integerToArray(v[11], 1); //one byte
      var creator = stringToArray(atob(v[8])); //pubkey size
      var question = stringToArray(atob(v[3])); //32 bytes size
      var orders = stringToArray(atob(v[7])); //32 bytes
      //var serialized = integerToArray(v[1], 256).concat(

      serialized = []
        .concat(id)
        .concat(result)
        .concat(type)
        .concat(starts)
        .concat(done_timer)
        .concat(governance)
        .concat(governance_amount)
        .concat(creator)
        .concat(question)
        .concat(orders);

      //console.log("serialized oracle");
      //console.log(JSON.stringify(serialized));
      return serialized;
    } else {
      console.log('cannot decode type ');
      console.log(t);
    }
  }
}
