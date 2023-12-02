
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BuyProduct from './BuyProduct';

export default function Home() {
  //state
  const [items, setItems] = useState<Array<ProductModel>>();
  const [loading, setLoading] = useState(false);
  const [openBuy, setOpenBuy] = useState<ProductModel | undefined>(undefined)
  //params
  const { name } = useParams();

  //fecth
  function getItems() {
    setLoading(true);
    fetch(`https://dummyjson.com/products/category/${name}`)
      .then(res => res.json())
      .then((data: ResProductModel) => {
        setItems(data?.products);
        setLoading(false);
      })
      .then(console.log);
  }

  //functions

  //effect
  useEffect(() => {
    getItems();
  }, [])

  return (
    <>
      {openBuy! && <BuyProduct openModal={openBuy} setOpenModal={setOpenBuy} />}
      <nav className="flex h-12 p-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              Categories
            </Link>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{name}</span>
            </div>
          </li>
        </ol>
      </nav>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 self-center p-4 items-center place-items-center'>
        {loading? <>
        {Array(9).fill(0)?.map((el:any, index:number)=>(
          <div key={index} role="status" 
          className="max-w-sm overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
              </svg>
          </div>
          <div className="w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <span className="sr-only">Loading...</span>
      </div>
      
        ))}
        </>:
        <>
        { items?.map((item: ProductModel, index: number) => (
          <div
            key={item?.id}
            className="max-w-sm overflow-hidden bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full relative pt-[100%] rounded-t-lg">
              <Image
                alt="product image"
                objectFit="contain"
                fill
                src={item?.thumbnail} />
            </div>
            <div className="px-5 pb-5">

              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white  line-clamp-1">{item?.title}</h5>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400  line-clamp-2">
                {item?.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${item?.price}</span>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setOpenBuy(item)}
                >
                  Buy</button>
              </div>
            </div>
          </div>

        ))}
        </>
       }
      </div>
    </>

  )
}
