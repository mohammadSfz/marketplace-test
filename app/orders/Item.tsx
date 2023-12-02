
'use client';

import { useEffect, useRef, useCallback, memo } from 'react'
import { useOrders } from '~/context/order';
import Image from 'next/image';

interface AppProps {
  item: OrderModel;
}


const App: React.FC<AppProps> = ({ item }) => {
  const workerRef: any = useRef<Worker>();
  workerRef.change = [];

  useEffect(() => {
    workerRef.change[item?.id] = new Worker(new URL('~/workers/changestatus.ts', import.meta.url));
    workerRef.change[item?.id].onmessage = (event: any) => {
      if (event.data === "finishwork") {
        return () => {
          workerRef.change[item?.id]?.terminate()
        }
      }
      
    }
    handleWork();
  }, [item?.id])


  const handleWork = useCallback(async () => {
    workerRef.change[item?.id]?.postMessage(item?.id)
  }, []);
  return (
    <li className="py-3 sm:py-4" >

      <div className="flex items-center">
        <div className="flex-shrink-0 w-[100px] h-[100px] relative">
          <Image
            alt="product image"
            objectFit="contain"
            fill
            src={item?.product?.thumbnail} />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {item?.product?.title}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            status: {item?.status}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            Your location: {(item?.coordinate?.lat).toFixed(4)}, {item?.coordinate?.lng.toFixed(4)}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          ${item?.product?.price.toFixed(2)}
        </div>

      </div>
    </li>
  );
};

const MemoApp = memo(App);
export default MemoApp;

