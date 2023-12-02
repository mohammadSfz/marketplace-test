
interface OrderModel {
    id:number,
    status: 'pending'| 'in-process'| 'delivery'| 'delivered',
    coordinate: {
      lat: number,
      lng: number
    },
    product: ProductModel
}


