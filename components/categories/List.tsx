'use client';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Home() {
    //state
    const [items, setItems] = useState<Array<string>>([]);
    //fetch

    function getItems() {
        fetch('https://dummyjson.com/products/categories')
            .then((res: any) => res.json())
            .then(((data: any) => setItems(data)))
            .then(console.log);
    }
    //effects
    useEffect(() => {
        getItems();
    }, [])
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 self-center p-4 items-center" >
            {items?.map((category: string, index: number) => (
                <div key={index} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name:<br/> {category}</h5>
                    <Link href={`/category/${category}`} className='text-white flex justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                        Show Products
                    </Link>
                </div>
            ))}
        </div>
    )
}
