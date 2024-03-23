import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import { CartIconContainer, ItemCountContainer, ShoppingIconContainer } from './cart-icon-styles.jsx';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toogleHandler = () => setIsCartOpen(!isCartOpen);


    return (
        <CartIconContainer onClick={toogleHandler}>
            {/* Here we are directly using the ShoppingIconContainer instead of calling the ShoppingIcon component seperately and then providing a classname to it and then desinging it */}
            < ShoppingIconContainer />
            <ItemCountContainer>{cartCount}</ItemCountContainer>
        </CartIconContainer>
    );
};

export default CartIcon;