import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CartDropdown = (props) => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigateTo = useNavigate();

  const goToCheckoutPage = () => {
    navigateTo('/checkout');
    setIsCartOpen(false);
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={goToCheckoutPage}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
