export function string_to_array(x) {
  var a = new Uint8Array(x.length)
  for (var i = 0; i < x.length; i++) {
    a[i] = x.charCodeAt(i)
  }
  return Array.from(a)
}

export function integer_to_array(i, size) {
  var a = []
  for (var b = 0; b < size; b++) {
    a.push(((i % 256) + 256) % 256)
    i = Math.floor(i / 256)
  }
  return a.reverse()
}

export function array_to_string(x) {
  var a = ''
  for (var i = 0; i < x.length; i++) {
    a += String.fromCharCode(x[i])
  }
  return a
}
