import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext);

  const toogleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" onClick={toogleIsCartOpen} />
      <span className="item-count">{cartItemCount}</span>
    </div>
  );
};

export default CartIcon;
