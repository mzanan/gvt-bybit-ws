const crypto        = require('crypto')

const wsConnection  = require('./wsConnection');
const client        = wsConnection();

const APIKEY = "RSAQLEEAWSMFEMXOLY"
const SECRET = "WLGTXXBBIXICZOGNVEEKXKLLDJQCNPMFKMGB"

const getExpires = () => {
  return new Date().getTime() + 10000
}

const getSignature = () => {
  const expires = getExpires()

  return crypto
    .createHmac("sha256", SECRET)
    .update("GET/realtime" + expires)
    .digest("hex")
}

const getPayload = () => {
  const signature = getSignature()
  const expires   = getExpires()

  return {
    op: "auth",
    args: [APIKEY, expires.toFixed(0), signature]
  }
}

const openConnection = () => {
  client.on("open", () => {
    console.log('"open" event! ', "WebSocket Client Connected")

    const payload = getPayload()  
      
    client.send(JSON.stringify(payload))
    setInterval(() => {
      client.ping()
    }, 30000)
    client.ping()
    client.send(JSON.stringify({ op: "subscribe", args: ["wallet"] }))
    /* client.send(JSON.stringify({ op: "subscribe", args: ["trades.BTCUSD"] })) */
  })
}

const getMessage = async () => {
  return new Promise((resolve, reject) => {
    client.on("message", data => {
      const resp = JSON.parse(Buffer.from(data).toString())
      console.log('"message" event! %j', "listening websocket")

      resolve(resp);
    })
  })
}

client.on("ping", () => {
  console.log("ping received")
})

client.on("pong", () => {
  console.log("pong received")
})

openConnection()

module.exports = {
  openConnection,
  getMessage
}