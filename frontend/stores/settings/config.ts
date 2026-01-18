import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../slices/counter"
import authReducer from "../slices/auth"

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            auth: authReducer
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']