import { createSelector } from 'reselect';

/*
2 types of Selector:
1.input selector (doesn't use createSelector)
2.output selector (use createSelector and input selector)
*/

//input selector
const selectCart = state => state.cart;

//output selector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems 
);
/*
create selector dapetin 2 argument:
1. array dari yg mau diselect (tentu bisa lebih dari 1 item)
2. sub element apa yg mau diselect dari array
*/
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce((accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity, 0)
)

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce((accumulatedPrice, cartItem) =>
        accumulatedPrice + cartItem.price * cartItem.quantity, 0)
)