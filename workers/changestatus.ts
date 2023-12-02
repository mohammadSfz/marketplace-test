import axios from 'axios';

let statusList = ['pending', 'in-process', 'delivery', 'delivered'];

addEventListener('message', (event: MessageEvent<number>) => {
  setInterval(() => {
    fetch(`http://localhost:3002/orders/${event.data}`)
    .then(res=> res.json())
    .then(data=> {
      if(data?.status !== "delivered"){
        changeStatus(data)
      }else{
        postMessage("finishword")
      }
    } )
    .catch(err=> console.log(err, "err"))
    
  }, 30000)

})

const changeStatus = (data:OrderModel)=>{
  let findi = statusList.indexOf(data?.status);
  axios.put(`http://localhost:3002/orders/${data?.id}`,{
    ...data,
    status:statusList[findi+1]
  })
  .then(res => {})
  .catch(err=> console.log(err))
}
