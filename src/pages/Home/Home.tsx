import { Categorys2, InfoOptions } from "../../constants/constants";
import bannerImage from "../../assets/banner.jpg";
import ProductList from "../../components/ProductList/ProductList";
const Home = () => {
  return (
    <div className="px-4 flex flex-col" data-testid="home-container">
      {/* Banner Section */}
      <div className="flex flex-col md:flex-row mt-8">
        <div className="mt-2 md:mt-0 w-full">
          <img
            src={bannerImage}
            alt="banner"
            aria-label="banner"
            className="w-full rounded-sm"
          />
        </div>
      </div>

      {/* Categorys2 Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <ul
          data-testid="categorys2-container"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {Categorys2.map((category) => (
            <li
              key={category.id}
              className="flex flex-col items-center border-1 border-grey-300 rounded-lg shadow-md relative group hover:scale-105 transition-all duration-300"
            >
              <div className="w-full h-60 object-cover rounded-lg">
                <img
                  src={category.image}
                  alt={category.category}
                  className="w-full h-60 object-cover rounded-lg"
                />
              </div>

              <div className="left-10 top-20 absolute">
                <h3 className="font-semibold text-center text-xl">
                  {category.category}
                </h3>
                <p className="text-md text-gray-600 text-center">
                  {category.cta}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Products Section  */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Top Rated Products</h2>
        <ProductList limit={5} skip={0} />
      </div>

      {/* Info Options Section */}
      <div className="mt-8 mb-10">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <div
          data-testid="info-options-container"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {InfoOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className="flex flex-col items-center p-4 border rounded-lg shadow-md border-grey-300 group hover:scale-105 transition-all duration-300"
              >
                <IconComponent className="text-2xl mb-2 text-red-500" />
                <h3 className="font-semibold text-center">{option.title}</h3>
                <p className="text-sm text-gray-600 text-center">
                  {option.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
