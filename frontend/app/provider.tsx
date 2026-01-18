'use client'

import Cookies from 'js-cookie'
import { Provider } from 'react-redux'
import { useRef, useEffect } from 'react'
import { setAuthentication } from '@/stores/slices/auth'
import { makeStore, AppStore } from '@/stores/settings/config'
import { useAppDispatch } from '@/stores/settings/hooks'


function AuthInitializer() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = Cookies.get('token');
        dispatch(setAuthentication(!!token));
    }, [dispatch]);

    return null;
}

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(undefined);

    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    return (
        <Provider store={storeRef.current}>
            <AuthInitializer />
            {children}
        </Provider>
    )
}
