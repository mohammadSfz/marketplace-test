'use client';

import React from 'react';
import Link from 'next/link'

const App: React.FC = () => {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap gap-x-3 items-center mx-auto max-w-screen-xl p-4">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold  text-gray-900 dark:text-white">Market Place</span>
            </Link>
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
                <Link href="/" className='"text-sm  text-blue-600 dark:text-blue-500 hover:underline"'>
                Categories
                </Link>
                <Link href="/orders" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                Orders
                </Link>
               
            </div>
        </div>
    </nav>
    );
};

export default App;
