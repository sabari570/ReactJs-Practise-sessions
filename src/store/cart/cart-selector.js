import { createSelector } from "reselect";

// First extracting the cart from the universal state object


// this is what we actually want to get through cart-selector
const newCartCount = newCartItems.reduce(
    (total, cartItem) => total + cartItem.quantity, 0);
const newCartTotal = newCartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);