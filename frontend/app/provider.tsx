'use client'

import { Provider } from 'react-redux'
import { useRef, useEffect } from 'react'
import { fetchMyData } from '@/stores/slices/user'
import { makeStore, AppStore } from '@/stores/settings/config'

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(undefined)

    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    useEffect(() => {
        const haveData = localStorage.getItem('mydata');

        if(haveData) {
            storeRef.current?.dispatch(fetchMyData());
        }
    }, []);

    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    )
}
