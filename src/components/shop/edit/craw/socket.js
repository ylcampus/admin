const ws = new WebSocket('ws://192.168.1.4:3000/craw')
ws.onopen = (ws) => {
  console.log('socket连接成功')
}
module.exports = ws
