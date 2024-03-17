import { useContext } from 'react';
import Button from '../button/button-component';
import CartItem from '../cart-item/cart-item-component';
import './cart-dropdown-styles.scss';
import { CartContext } from '../../contexts/cart-context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    // This is used for navigating to different routes when clicked on a button
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.length === 0 ?
                    (<span className='empty-message'>Your cart is empty</span>)
                    : 
                    (
                        cartItems.map((cartItem) => {
                            return (
                                < CartItem key={cartItem.id} cartItem={cartItem} />
                            );
                        })
                    )
                }
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;