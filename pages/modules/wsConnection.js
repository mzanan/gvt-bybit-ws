const webSocket = require('ws')

const wsConnection = () => {
  const endpoint = "wss://stream.bybit.com/realtime"
  console.log("attempting to connect to WebSocket %j", endpoint)
  const client = new webSocket(endpoint)

  return client
}
module.exports = wsConnection
