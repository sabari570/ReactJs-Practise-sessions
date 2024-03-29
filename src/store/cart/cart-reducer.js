import { createSlice } from "@reduxjs/toolkit";

const CART_INITAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};

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

export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITAL_STATE,
    reducers: {
        addItemToCart: (state, action) => {
            state.cartItems = addCartItem(state.cartItems, action.payload);
        },
        removeItemFromCart: (state, action) => {
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        clearItemFromCart: (state, action) => {
            state.cartItems = clearCartItem(state.cartItems, action.payload);
        },
        setIsCartOpen: (state, action) => {
            state.isCartOpen = action.payload;
        }
    }
});

export const { addItemToCart, removeItemFromCart, clearItemFromCart, setIsCartOpen } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;