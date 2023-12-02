addEventListener('message', (event: MessageEvent<number>) => {
  setInterval(() => {
    getOrders();
  }, 5000)
  function getOrders(){
    fetch('http://localhost:3002/orders')
    .then(res=> res?.json())
    .then(data => postMessage(data))
    .catch(err=> console.log(err))
  }
})