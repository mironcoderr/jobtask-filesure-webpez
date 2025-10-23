import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../slices/counter"
import userReducer from "../slices/user"

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            user: userReducer
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']