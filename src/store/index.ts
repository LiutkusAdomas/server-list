import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { playgroundApi } from "../api/playgroundApiService";
import tokenSlice from "./slice/tokenSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth']
};

const rootReducer = combineReducers({
    auth: tokenSlice,
    [playgroundApi.reducerPath]: playgroundApi.reducer
})
type RootReducer = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: persistReducer<RootReducer>(persistConfig, rootReducer),
    middleware: (getDefaultMiddlerWare) =>
        getDefaultMiddlerWare().concat(playgroundApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;