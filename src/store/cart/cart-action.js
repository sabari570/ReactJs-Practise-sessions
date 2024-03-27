import { createAction } from "../../utils/create-actions/create-action-for-reducers";
import { cartReducerActionTypes } from "./cart-action-types";


const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains the productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // If found then increment the products quantity and update and return the cartItems
    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            if (cartItem.id === productToAdd.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
    }

    // If not found then add the item to the cartItems list with the quantity field as 1 and then return the cartItems
    // ...cartItems -> spreads the list & {...productToAdd} -> spreads the object
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToBeRemoved) => {
    // Find the object from the cartItems list to be removed
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToBeRemoved.id);

    // If the item count is 1 then remove the product from the cart using the filter function
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToBeRemoved.id);
    }

    // else decrease the quantity of the item
    return cartItems.map((cartItem) => {
        if (cartItem.id === cartItemToBeRemoved.id) {
            return { ...cartItem, quantity: cartItem.quantity - 1 }
        }
        return cartItem;
    });
};

const clearCartItem = (cartItems, cartItemToBeRemoved) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToBeRemoved.id);
};

// This function is to add the product to cart
export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(cartReducerActionTypes.SET_CART_ITEMS, newCartItems);
};

// This function is to decrease the product added to cart
export const removeFromCart = (cartItems, cartItemToBeRemoved) => {
    const newCartItems = removeCartItem(cartItems, cartItemToBeRemoved);
    return createAction(cartReducerActionTypes.SET_CART_ITEMS, newCartItems);
};

// This function is to clear the item from the cart
export const clearItemFromCart = (cartItems, cartItemToBeRemoved) => {
    const newCartItems = clearCartItem(cartItems, cartItemToBeRemoved);
    return createAction(cartReducerActionTypes.SET_CART_ITEMS, newCartItems);
};

// Here we are retuning the action for each set functions so that its sets the universal object
export const setIsCartOpen = (isCartOpen) => createAction(cartReducerActionTypes.SET_IS_CART_OPEN, isCartOpen);