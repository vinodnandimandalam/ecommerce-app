import ProductList from "../../components/ProductList/ProductList";

const Shop = () => {
  return (
    <div data-testid="shop-container">
      <h1 className="text-2xl font-bold m-4">All Products</h1>
      <ProductList limit={20} skip={0} />
    </div>
  );
};

export default Shop;
