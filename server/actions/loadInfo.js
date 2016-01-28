export default function loadInfo() {
  return new Promise((resolve) => {
    resolve({
      message: 'API server test message',
      time: Date.now()
    })
  })
}
