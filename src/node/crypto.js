import sjcl from 'shcl'

export function hash(data) {
  if (data instanceof String) {
    data = data.split('').map(x => x.charCodeAt(0))
  }

  const bits = sjcl.codec.bytes.toBits(data)
  const hashed = sjcl.hash.sha256.hash(bits)

  return sjcl.codec.bytes.fromBits(hashed)
}
