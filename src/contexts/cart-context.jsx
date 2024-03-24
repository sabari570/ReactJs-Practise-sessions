import { createContext, useReducer } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    removeFromCart: () => { },
    clearItemFromCart: () => { },
    totalPrice: 0,
});

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

// Creating the inital state of the cartReducer
// reducers containes only the readable value which means only the values like cartItems, cartCount, ...
const INITAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
};

// Creating the types objects
const cartReducerActionTypes = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    ADD_TO_CART: 'ADD_TO_CART',
};

// Creating the cartReducer
const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch(type){
        case cartReducerActionTypes.ADD_TO_CART: 
            return {
                ...state, 
                ...payload,
            }
        case cartReducerActionTypes.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        default: throw new Error(`unhandled type ${type} in cartReducer`)
    }
};

export const CartProvider = ({ children }) => {
    // Using the created cartReduer using the useReducer Hook
    const [ state, dispatch ] = useReducer(cartReducer, INITAL_STATE);

    // destructing the state value
    const { cartItems, cartCount, totalPrice, isCartOpen } = state;

    // This function is written to update the cartItems value, cartCount and the cartTotal
    // instead of using seperate useStates and seperate useEffects everything is written inside a single function
    const updateCartItemsReducer = (newCartItems) => {
        /*
        What this function is actually supposed to do =>
      ------------------------------------------------------  
        generate newCartCount

        generate newCartTotal

        dispatch with a new payload = {
            newCartItems, newCartCount, newCartTotal
        }
        */

        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        // Creating an actions object to call the dispatch
        const action = {
            type: cartReducerActionTypes.ADD_TO_CART,
            payload: {
                cartItems: newCartItems,
                cartCount: newCartCount,
                totalPrice: newCartTotal,
            }
        };
        dispatch(action);
    };

    // Function to update the value of isCartOpen using the reducer
    const setIsCartOpen = (isCartOpenValue) => {
        const action = {
            type: cartReducerActionTypes.SET_IS_CART_OPEN,
            payload: isCartOpenValue,
        };
        dispatch(action);
    };

    // This function is to add the product to cart
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    // This function is to decrease the product added to cart
    const removeFromCart = (cartItemToBeRemoved) => {
        const newCartItems = removeCartItem(cartItems, cartItemToBeRemoved);
        updateCartItemsReducer(newCartItems);
    };

    // This function is to clear the item from the cart
    const clearItemFromCart = (cartItemToBeRemoved) => {
        const newCartItems = clearCartItem(cartItems, cartItemToBeRemoved);
        updateCartItemsReducer(newCartItems);
    };

    const values = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
        removeFromCart,
        clearItemFromCart,
        totalPrice,
    };
    return (
        < CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    );
};