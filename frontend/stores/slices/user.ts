import { User } from '@/types/user';
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            return rejectWithValue('Unauthorized user!');
        }

        const data = await response.json();

        return data.user;

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

