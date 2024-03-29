// In this branch we actually learn redux-toolkit and its configuartion
// it is pretty similar to redux-state-management but reduces many of the boiler plate code and makes it easies for us
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";

// This is used for persisting that mean saving the state object so that the app persists the state of the object
// even if we relaod the web app
import { persistStore, persistReducer } from "redux-persist";

// This uses the localStorage of the web browser
import storage from "redux-persist/lib/storage";

// First we write the configuration object that says what are the we want to persist
// all these codes are same for any different app only the values to store changes rest everything is the same
const persistsConfig = {
    key: 'root',    // here root mean we want to persist the whole thing that starts from the root level
    storage,
    // blacklist: ['user'],  // This says what reducers we should blacklist which means dont save in the localstorage, 'user' is the name of the reducer
    whitelist: ['cart']
};

// This persistedReducer will be passed to the store
// It takes in the persistConfig and the rootReducer
const persistedReducer = persistReducer(persistsConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

// There are 3 middlewares that are already present in the redux-toolkit inside configureStore
// 1. thunk middleware
// 2. non-serializable check middleware
// 3. immutabilty check middleware -> which means we cant change the value of the state variables

export const store = configureStore({
    reducer: persistedReducer,
    // configureStore already have some pre-defined middlewares that consists of thunk and some non-serializable checks
    // this is how we actually solve the problem of non-serializable check middleware 
    // we actually remove the non-serializable check middleware by setting (serializableCheck to false) from the configureStore and keep all other pre-defined middleware
    // and also add our own logger middleware we created
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(middleWares),
});

// export the persistStore by passing in the store
export const persistor = persistStore(store);