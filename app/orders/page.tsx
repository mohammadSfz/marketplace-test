
'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

import OrderItem from './Item';

const Home = () => {
  //hooks
  const workerRef: any = useRef<Worker>();
  //state
  const [items, setItems] = useState<Array<OrderModel>>([]);
  const [loading, setLoading] = useState(false);
  //fetch
  const getItems = () => {
    setLoading(true);
    axios.get(`http://localhost:3002/orders`)
      .then((res: any) => {
        if (res?.data) {
          setItems(res?.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }
  useEffect(() => {
    getItems();
  }, [])
  //workers

  useEffect(() => {
    workerRef.orders = new Worker(new URL('~/workers/getstatus.ts', import.meta.url))
    workerRef.orders.onmessage = (event: any) => {
      setItems(event?.data);
      return () => {
        workerRef.orders?.terminate()
      }
    }
    handleWork();
  }, []);
  const handleWork = useCallback(async () => {
    workerRef.orders?.postMessage("checkstatus")
  }, []);

  return (
    <>


      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

        {items?.length > 0 ? <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {items?.map((item: OrderModel, index: number) => (
              <OrderItem key={index} item={item} />
            )
            )}
          </ul>
        </div> :
          <div className=" text-black">
            No Items
          </div>}
      </div>


    </>

  )
}

const MemoOrders = React.memo(Home);


export default MemoOrders;


