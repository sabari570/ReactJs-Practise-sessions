import { userActionTypes } from "./user-action-types";

const INITIAL_STATE = {
    currentUser: null,
};

// Here we dont throw an error in the default state because since we combine all the reducers into a
// single rootReducer there might be types that dont match the userReducer but instead match the other
// reducers like cartReducers or categoryReducers, etc so in default state we return the state
export const userReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch(type){
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default: return state;
    }
};