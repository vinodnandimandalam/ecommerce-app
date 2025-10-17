import { useSelector } from "react-redux";
import type { RootState } from "../../types/state";
import CartProduct from "../CartProduct/CartProduct";

const Cart = () => {
  const productsInCart = useSelector(
    (state: RootState) => state.cart.productsInCart
  );
  return (
    <div data-testid="cart-container">
      <h2 className="text-2xl font-bold m-4">Shopping Cart</h2>

      {productsInCart.map((product) => (
        <div data-testid="cart-item-container" key={product.id}>
          <CartProduct key={product.id} cartProduct={product} />
        </div>
      ))}
    </div>
  );
};

export default Cart;
