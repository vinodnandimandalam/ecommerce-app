import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../../types/state";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { totalQuantity } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Helper function to get link classes
  const getLinkClasses = (path: string) => {
    const baseClasses = "hover:text-red-500 hover:underline font-semibold";
    const activeClasses = "text-red-500 underline font-bold";

    return isActive(path) ? `${baseClasses} ${activeClasses}` : baseClasses;
  };

  return (
    <nav className="sticky z-50 top-0 flex-col px-4 pb-4 pt-8 shadow-md bg-white w-full">
      <div className="flex items-center w-full gap-2 md:gap-4">
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-lg md:text-2xl font-bold">E-Shopzz</h1>
          </Link>
        </div>

        <form className="flex items-center border rounded-md border-gray-300 relative flex-1">
          <input
            type="search"
            placeholder="Search"
            name="search"
            aria-label="search"
            className="p-2 w-full"
          />
          <FaSearch className="text-red-500 absolute right-2" />
        </form>

        <div className="flex items-center" data-testid="cart-count-counter">
          <button aria-label="Shopping-cart" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="text-red-500 text-2xl cursor-pointer" />
          </button>
          <span className="text-sm bg-red-500 text-white rounded-full px-2 py-1">
            {totalQuantity}
          </span>
        </div>

        <div className="flex items-center">
          <button className="rounded-md bg-black text-white hidden md:block p-2">
            Login / Signup
          </button>
          <FaUserCircle className="text-red-500 text-2xl md:hidden" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-8 mt-4">
        <Link to="/" className={getLinkClasses("/")}>
          Home
        </Link>
        <Link to="/about" className={getLinkClasses("/about")}>
          About
        </Link>
        <Link to="/contact" className={getLinkClasses("/contact")}>
          Contact
        </Link>
        <Link to="/shop" className={getLinkClasses("/shop")}>
          Shop
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
