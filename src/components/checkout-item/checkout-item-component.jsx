import './checkout-item-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeFromCart, clearItemFromCart } from '../../store/cart/cart-action';
import { selectCartItems } from '../../store/cart/cart-selector';

const CheckoutItem = ({ cartItem }) => {
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    
    const { name, quantity, price, imageUrl } = cartItem;

    const clearCartItemHandler = () => {
        dispatch(clearItemFromCart(cartItems, cartItem));
    };

    const addItemToCartHandler = () => dispatch(addItemToCart(cartItems, cartItem));

    const removeCartItemHandler = () => dispatch(removeFromCart(cartItems, cartItem));

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>

            <span className='name' >{name}</span>

            <span className='quantity'>
                <div className='arrow' onClick={removeCartItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemToCartHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearCartItemHandler}>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;