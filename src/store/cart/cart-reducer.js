import { cartReducerActionTypes } from "./cart-action-types";

const INITAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};

// Creating the cartReducer
export const cartReducer = (state = INITAL_STATE, action = {}) => {
    const { type, payload } = action;
    switch(type){
        case cartReducerActionTypes.ADD_TO_CART: 
            return {
                ...state, 
                cartItems: payload,
            }
        case cartReducerActionTypes.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        default: return state;
    }
};