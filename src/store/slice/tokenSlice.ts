import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | undefined;
}

const initialState: AuthState = {
    token: undefined
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | undefined>) => {
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = undefined;
        }
    },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;