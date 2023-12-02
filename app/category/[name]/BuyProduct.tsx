'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Modal, Spinner } from '~/components';
import MapInput from '~/components/dataEntry/MapInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface AppProps {
    openModal: ProductModel | undefined
    setOpenModal: Function
}

const App: React.FC<AppProps> = ({ openModal, setOpenModal }) => {
    //hooks
    const router = useRouter();
    const workerRef: any = useRef<Worker>();
    workerRef.change = [];
    //state
    const [position, setPosition]: any = useState([51.505, -0.09]);

    //fetch
    const addOrder = () => {
        axios.post('http://localhost:3002/orders', { status: "pending", coordinate: position, product: openModal })
            .then((res: any) => {
                if (res?.data) {              
                    setTimeout(() => {
                        router.push('/orders');
                    }, 0)
                }
            })
            .catch((err: any) => {
                console.log(err)
            })
    }

    return (
        <>

            <Modal show={openModal ? true : false} onClose={() => setOpenModal(undefined)}>
                <Modal.Header>Select location</Modal.Header>
                <Modal.Body>
                    <div>
                        <MapInput onChange={setPosition} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={addOrder}
                        type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Submit
                    </button>

                </Modal.Footer>

            </Modal>
        </>
    );
};

export default App;
