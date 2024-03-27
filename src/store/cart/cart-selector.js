import { createSelector } from "reselect";

// First extracting the cart from the universal state object
const selectCartReducer = (state) => state.cart;

// Memoizing the cartItems from the cart in state
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// We also memoiz the isCartOpen variable
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// Now this is the selector which gives the newCartCount and the newCartTotal from the selectCartItems selector that we memoized earlier
// we take the selectCartItems as the input parameter and the output parameter will be the newCartTotal that we have accumulated from
// the below selector
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

// selector which gives us the cartTotal, even this is memoized
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
