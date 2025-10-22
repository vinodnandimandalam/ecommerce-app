import { useSelector } from "react-redux";
import type { RootState } from "../../types/state";
import CartProduct from "../CartProduct/CartProduct";
import CartTotal from "../CartTotal/CartTotal";

const Cart = () => {
  const productsInCart = useSelector(
    (state: RootState) => state.cart.productsInCart
  );
  return (
    <div
      data-testid="cart-container"
      className="w-full border-1 border-gray-300 rounded-sm p-2 m-2 flex flex-col md:flex-row justify-between"
    >
      <div>
        <h2 className="text-2xl font-bold m-4">Shopping Cart</h2>
        {/* Cart Products */}
        {productsInCart.map((product) => (
          <div data-testid="cart-item-container" key={product.id}>
            <CartProduct key={product.id} cartProduct={product} />
          </div>
        ))}
      </div>

      {productsInCart.length > 0 ? (
        <div className="w-full md:w-1/3">
          {/* Cart Total  */}
          <h2 className="text-2xl font-bold m-4">Cart Total</h2>
          <CartTotal />
        </div>
      ) : (
        <div>No products in cart</div>
      )}
    </div>
  );
};

export default Cart;
