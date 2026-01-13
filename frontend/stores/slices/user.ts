import { User } from '@/types/user';
import apiClient from '@/library/axios.client';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: User | null;
    error: string | null;
    loading: boolean;
}

const initialState: UserState = {
    user: null,
    error: null,
    loading: true,
};

export const fetchMyData = createAsyncThunk('user/fetchMyData', async (_, { rejectWithValue }) => {
    try {
        const response = await apiClient.get("/users/me");

        if (!response.data.success) {
            return rejectWithValue('Unauthorized user!!!');
        }

        return response.data.user;

    } 
    catch (error) {
        return rejectWithValue('Something went wrong!');
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMyData(state, action: PayloadAction<User | null>) {
            state.user = action.payload;

            if (action.payload) {
                localStorage.setItem('mydata', JSON.stringify(action.payload));
            } 
            else {
                localStorage.removeItem('mydata');
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMyData.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchMyData.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loading = false;

            if (action.payload) {
                localStorage.setItem('mydata', JSON.stringify(action.payload));
            }
        })
        .addCase(fetchMyData.rejected, (state, action) => {
            state.user = null;
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { setMyData } = userSlice.actions;
export default userSlice.reducer;

