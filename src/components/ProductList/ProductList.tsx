import type { AppDispatch, RootState } from "../../types/state";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchProducts } from "./state/Products.thunk";
import Product from "../Product/Product";
import type { IProduct } from "../../types/product";
import { RequestStatus } from "../../types/request-status";

interface ProductListProps {
  limit: number;
  skip: number;
}

const ProductList = ({ limit, skip }: ProductListProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, status } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ limit, skip }));
  }, [dispatch, limit, skip]);

  return (
    <div data-testid="product-list-wrapper">
      {status === RequestStatus.PENDING && (
        <div data-testid="loader-container">
          <h3>Loading...</h3>
        </div>
      )}

      {status === RequestStatus.FAILED && (
        <div data-testid="error-container">
          <h3>Error</h3>
        </div>
      )}

      {status === RequestStatus.SUCCESSFULL && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((eachProduct: IProduct) => (
            <div key={eachProduct.id} data-testid="product-list-item-wrapper">
              <Product key={eachProduct.id} product={eachProduct} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
