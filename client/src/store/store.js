import persistReducer from "redux-persist/es/persistReducer";
import localStorage from "redux-persist/es/storage";
import sessionStorage from "redux-persist/es/storage/session";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "./auth/authSlice";

// import { persistReducer, persistStore } from "redux-persist";
// import storageSession from "redux-persist/lib/storage/session";
// import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: localStorage,
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
