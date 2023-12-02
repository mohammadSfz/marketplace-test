interface ProductModel {
    id: number
    title: string
    price: number
    images: Array<string>,
    thumbnail: string,
    description: string,
    category: string
}


interface ResProductModel {
   products:Array<ProductModel>,
   limit: number,
   skip: number,
   total: number
}