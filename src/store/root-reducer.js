// this is the root-reducer file which combines all the reducers of the entire app
// and create a global single reducer
// It will be from this reducer we actually access the state and dispatch the actions
import { combineReducers } from "redux";
import { userReducer } from "./user/user-reducer";
import { categoriesReducer } from "./categories/category-reducer";

// We pass in a map of reducers inside combineReducers
// user -> key and it will containe the userReducer and so on...
export const rootReducer = combineReducers({
    user: userReducer,
    category: categoriesReducer,
});