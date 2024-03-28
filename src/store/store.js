// This is the file where actually we have the core store of redux
// it is here where we actually createStore for redux and pass the rootReducer into

import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

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

// Whenever you dispatch an action it first hits the middleWares and only then it goes to the rootReducer
// to carry out the other purposes
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// Syntax of the createStore-> createStore( <root_reducer>, <additional default states (mostly used for testing)>, <middleware for the logger> )
// pass in the persistedReducer in the place of rootReducer
export const store = createStore(persistedReducer, undefined, composedEnhancers);

// export the persistStore by passing in the store
export const persistor = persistStore(store);