import { CartIconContainer, ItemCountContainer, ShoppingIconContainer } from './cart-icon-styles.jsx';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart-selector.js';
import { setIsCartOpen } from '../../store/cart/cart-reducer';
import { useSelector, useDispatch } from 'react-redux';

const CartIcon = () => {
    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toogleHandler = () => dispatch(setIsCartOpen(!isCartOpen));


    return (
        <CartIconContainer onClick={toogleHandler}>
            {/* Here we are directly using the ShoppingIconContainer instead of calling the ShoppingIcon component seperately and then providing a classname to it and then desinging it */}
            < ShoppingIconContainer />
            <ItemCountContainer>{cartCount}</ItemCountContainer>
        </CartIconContainer>
    );
};

export default CartIcon;