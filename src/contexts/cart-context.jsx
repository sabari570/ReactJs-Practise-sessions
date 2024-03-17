import { createContext, useEffect, useState } from "react";

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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // useEffect runs whenever there is a change in the cartitems
    useEffect(
        () => {
            const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
            setCartCount(newCartCount);
        },
        [cartItems]
    );

    // This useEffect is used to update the total price whenever their is a change in the cartitems
    useEffect(
        () => {
            const updatedTotalPrice = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
            setTotalPrice(updatedTotalPrice);
        },
        [cartItems]
    );

    // This function is to add the product to cart
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    // This function is to decrease the product added to cart
    const removeFromCart = (cartItemToBeRemoved) => {
        setCartItems(removeCartItem(cartItems, cartItemToBeRemoved));
    };

    // This function is to clear the item from the cart
    const clearItemFromCart = (cartItemToBeRemoved) => {
        setCartItems(clearCartItem(cartItems, cartItemToBeRemoved));
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