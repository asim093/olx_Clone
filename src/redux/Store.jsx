import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "./Rootreducer";
import { persistReducer } from "redux-persist";
import {persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "rootstorage",
    storage,
} 


const persistedReducer  = persistReducer(persistConfig, rootreducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);