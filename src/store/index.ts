import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { playgroundApi } from "../api/playgroundApiService";
import tokenSlice from "./slice/tokenSlice";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['auth']
};

const rootReducer = combineReducers({
    auth: tokenSlice,
    [playgroundApi.reducerPath]: playgroundApi.reducer
})

const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddlerWare) =>
        getDefaultMiddlerWare().concat(playgroundApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;