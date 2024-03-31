import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import { authReducer } from "./features/authSlice";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducers = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [thunk],
  devTools: process.env.REACT_APP_NODE_ENV !== "prod",
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
