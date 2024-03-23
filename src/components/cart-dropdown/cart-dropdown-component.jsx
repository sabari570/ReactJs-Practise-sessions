import { useContext } from 'react';
import Button from '../button/button-component';
import CartItem from '../cart-item/cart-item-component';
import './cart-dropdown-styles.jsx';
import { CartContext } from '../../contexts/cart-context';
import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer, CartItemsContainer, EmptyMessageContainer } from './cart-dropdown-styles.jsx';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    // This is used for navigating to different routes when clicked on a button
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length === 0 ?
                    (<EmptyMessageContainer className='empty-message'>Your cart is empty</EmptyMessageContainer>)
                    : 
                    (
                        cartItems.map((cartItem) => {
                            return (
                                < CartItem key={cartItem.id} cartItem={cartItem} />
                            );
                        })
                    )
                }
            </CartItemsContainer>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;