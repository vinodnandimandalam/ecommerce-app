import { FaStar } from "react-icons/fa";
import type { IProduct } from "../../types/product";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../Cart/state/Cart.slice";
import type { AppDispatch } from "../../types/state";

const Product = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(
      addProductToCart({
        id: product.id,
        name: product.title,
        price: product.price,
      })
    );
  };

  return (
    <div
      data-testid="product-wrapper"
      className="border-1 border-grey-300 rounded-sm p-2 m-2 shadow-md max-w-sm h-full flex flex-col justify-between group hover:scale-105 transition-all duration-300"
    >
      <div className="flex justify-center mb-10">
        <img src={product.image} alt={product.title} height={80} width={80} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-lg font-semibold">{`$ ${product.price}`}</p>
        <div className="flex gap-2 text-yellow-500">
          <FaStar></FaStar>
          <FaStar></FaStar>
          <FaStar></FaStar>
          <FaStar></FaStar>
          <FaStar></FaStar>
        </div>
      </div>

      <div className="flex justify-between">
        <span className="border-1 rounded-sm p-2 bg-gray-100 border-gray-300">
          {product.category}
        </span>

        <button
          className="border-1 rounded-full px-3.5 py-0.5 bg-red-500 text-white flex items-center justify-center text-lg font-bold"
          onClick={handleAddToCart}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Product;
