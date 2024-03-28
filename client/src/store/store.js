import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import themeReducer from "./themeSlice";

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer
});

const persistConfig = {
    key: "root",
    storage,
    version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store);

export default store;