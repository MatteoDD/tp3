function decryptedToken(token) {
  var base64Payload = token.split('.')[1]
  var payload = Buffer.from(base64Payload, 'base64')
  return JSON.parse(payload.toString())
}

function getUserId(token) {
  var payload = decryptedToken(token)
  return payload.sub
}

function getExpiration(token) {
  var payload = decryptedToken(token)
  return payload.exp
}

function isAlive(token) {
  var expiration = getExpiration(token)
  if(Date.now() >= expiration) {
    return false
  }
  return true
}

export default {
    decryptedToken,
    getExpiration,
    isAlive,
    getUserId
}