export default class RPC {
  constructor(url) {
    this.url = url;
  }

  getHeaders = async (top, number) => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(['headers', number, top]),
    });

    const data = await response.json();
    return data[1].slice(1);
  };

  getProof = async (tree, key, topHash) => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(['proof', tree, key, topHash]),
    });

    const data = await response.json();
    return data; //[1].slice(1);
  };
}

// export function variable_public_get(cmd, callback) {
//   var foobar = get(cmd);
//   var_get(foobar, callback, cmd);
// }

// function getter(t, u, callback) {
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.onreadystatechange = callback;
//   xmlhttp.open('POST', u, true);
//   xmlhttp.send(JSON.stringify(t));
//   return xmlhttp;
// }

// function get(t, callback) {
//   const u = url(get_port(), get_ip());
//   return getter(t, u, callback);
// }

// function get_port(server_port) {
//   return parseInt(server_port.value, 10);
// }

// function get_ip(server_ip) {
//   //return JSON.parse(server_ip.value);
//   return server_ip.value;
// }

// function url(port, ip) {
//   return 'http://'
//     .concat(ip)
//     .concat(':')
//     .concat(port.toString().concat('/'));
// }

// function var_get(x, callback, cmd) {
//   refresh_helper(
//     x,
//     cmd,
//     callback,
//     function() {
//       const p = JSON.parse(xml_out(x));
//       callback(p[1]);
//     },
//     100,
//   );
// }

// function xml_out(x) {
//   return x.responseText;
// }

// function refresh_helper(x, cmd, innercallback, callback, n) {
//   if (n < 1) {
//     return 'failed to connect';
//   } else if (x.status == 400) {
//     //the data we sent to the server got mixed up along the way, so it looks invalid to the server.
//     //So lets re-send the command.
//     setTimeout(function() {
//       return variable_public_get(cmd, innercallback);
//     }, 200);
//   } else if (x.status == 0) {
//     //this means that the server got our message, and it is still processing a response for us. So lets wait a bit, and then check if it is ready.
//     setTimeout(function() {
//       return refresh_helper(x, cmd, innercallback, callback, n - 1);
//     }, 150);
//   } else if (xml_check(x)) {
//     //this means that the server got our message, and it sent a response. The response is ready to read, so lets read it.
//     callback(xml_out(x));
//   } else {
//     //console.log(x.readyState);
//     //console.log(x.status);
//     setTimeout(function() {
//       return refresh_helper(x, cmd, innercallback, callback, n);
//     }, 10);
//   }
// }

// function xml_check(x) {
//   return x.readyState === 4 && x.status === 200;
// }
