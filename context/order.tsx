'use client';

import React from 'react';

const OrdersContext = React.createContext<Partial<any>>({});

type ActionType = {
    type?: "ADD" | "UPDATE" | "GET",
    value?: any
}

const reducer = (state: any, action: ActionType) => {
    switch (action.type) {
        case "ADD":
            let newState = [...state];            
            newState.push({...action?.value, id :(state?.length+1)})
            return newState;
        case "UPDATE":
            let updateArr = [...state];             
            let idx = updateArr?.findIndex(el=>el.id === action?.value?.id);
            console.log(idx)
            updateArr[idx].status = action?.value?.status;  
            return updateArr;
        case "GET":
            return state;
        default:
            throw new Error();
    }
};
export const OrdersProvider = ({ children }: { children: any }) => {
   
    const [orderData, dispatch] = React.useReducer<any|undefined>(reducer, []);
   
    return (
        <OrdersContext.Provider value={{ orderData, dispatch }}>
            {children}
        </OrdersContext.Provider>
    )
}

export const useOrders = () => React.useContext(OrdersContext);

