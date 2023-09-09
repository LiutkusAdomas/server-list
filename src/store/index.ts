import { configureStore } from "@reduxjs/toolkit";
import { playgroundApi } from "../api/playgroundApiService";
import tokenSlice from "./slice/tokenSlice";

const store = configureStore({
    reducer: {
        auth: tokenSlice,
        [playgroundApi.reducerPath]: playgroundApi.reducer
    },
    middleware: (getDefaultMiddlerWare) =>
        getDefaultMiddlerWare().concat(playgroundApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;