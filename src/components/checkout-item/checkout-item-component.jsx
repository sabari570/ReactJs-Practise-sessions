import { useContext } from 'react';
import './checkout-item-styles.scss';
import { CartContext } from '../../contexts/cart-context';

const CheckoutItem = ({ cartItem }) => {
    const { addItemToCart, removeFromCart, clearItemFromCart } = useContext(CartContext);
    const { name, quantity, price, imageUrl } = cartItem;

    const clearCartItemHandler = () => {
        clearItemFromCart(cartItem);
    };

    const addItemToCartHandler = () => addItemToCart(cartItem);

    const removeCartItemHandler = () => removeFromCart(cartItem);

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