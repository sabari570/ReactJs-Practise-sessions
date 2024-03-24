// This is the file where actually we have the core store of redux
// it is here where we actually createStore for redux and pass the rootReducer into

import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// Whenever you dispatch an action it first hits the middleWares and only then it goes to the rootReducer
// to carry out the other purposes
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// Syntax of the createStore-> createStore( <root_reducer>, <additional default states (mostly used for testing)>, <middleware for the logger> )
export const store = createStore(rootReducer, undefined, composedEnhancers);