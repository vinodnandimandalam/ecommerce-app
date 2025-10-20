import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../types/state";
import type { CarProduct } from "../Cart/state/Cart.slice";
import { useSelector } from "react-redux";
import type { RootState } from "../../types/state";
import type { IProduct } from "../../types/product";
import { cartSlice } from "../Cart/state/Cart.slice";
import { FaTrash } from "react-icons/fa";

const CartProduct = ({ cartProduct }: { cartProduct: CarProduct }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
  } = cartSlice.actions;

  const products = useSelector((state: RootState) => state.products.products);
  const currentProductDetails: IProduct | undefined = products.find(
    (product) => product.id === cartProduct.id
  );

  const handleIncreaseQuantity = () => {
    dispatch(increaseProductQuantity({ id: cartProduct.id }));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseProductQuantity({ id: cartProduct.id }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart({ id: cartProduct.id }));
  };

  return (
    <div
      data-testid="cart-product-wrapper"
      className="flex justify-between align-center border-1 border-gray-300 rounded-sm p-2 m-2 max-w-2xl flex-wrap"
    >
      <div className="flex items-center justify-center p-2 m-2 w-full md:w-1/3">
        <img
          src={currentProductDetails?.image}
          alt={currentProductDetails?.title}
          height={60}
          width={60}
          className="rounded-sm mr-2 mb-2"
        />
        <div>
          <h3 className="text-sm font-semibold">
            {currentProductDetails?.title}
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <p>{`$ ${currentProductDetails?.price}`}</p>

        <div className="flex items-center border-1 border-gray-300 rounded-sm p-2 m-2 cursor-pointer">
          <button onClick={handleIncreaseQuantity}>+</button>
          <p className="text-sm font-semibold mx-2 cursor-pointer">{`Quantity: ${cartProduct.quantity}`}</p>
          <button onClick={handleDecreaseQuantity}>-</button>
        </div>
        <p>{`$ ${(cartProduct.price * cartProduct.quantity).toFixed(2)}`}</p>
      </div>

      <button
        onClick={handleRemoveFromCart}
        aria-label="Remove from cart"
        className="cursor-pointer"
      >
        <FaTrash className="text-red-500" />
      </button>
    </div>
  );
};

export default CartProduct;
