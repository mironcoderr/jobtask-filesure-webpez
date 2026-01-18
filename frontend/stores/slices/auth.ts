import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    isAuthenticated: boolean
} = {
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthentication: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
        }
    }
})

export const { setAuthentication } = authSlice.actions
export default authSlice.reducer
