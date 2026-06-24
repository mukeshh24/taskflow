import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "./auth/authSlice";
import sessionStorage from "redux-persist/es/storage/session";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
