import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  const cartItems = useSelector((state) => state.cart.items);
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navList = (
    <ul className="flex space-x-2 font-medium text-md px-0">
      {/* Home */}
      <li>
        <Link to={"/"}>Home</Link>
      </li>

      {/* All Product */}
      <li>
        <Link to={"/allproduct"}>Products</Link>
      </li>

      {/* Signup */}
      {!user ? (
        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>
      ) : (
        ""
      )}
      {/* Login */}
      {!user ? (
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      ) : (
        ""
      )}
      {/* User */}
      {user?.role === "user" && (
        <li>
          <Link to={"/user"}>{user?.name}</Link>
        </li>
      )}
      {/* Admin */}
      {user?.role === "admin" && (
        <li>
          <Link to={"/admin"}>{user.name}</Link>
        </li>
      )}
      {/* Logout */}
      {user && (
        <li className="cursor-pointer" onClick={logout}>
          Logout
        </li>
      )}

      {/* Cart */}
      <li>
        <Link to={"/cart"}>Cart({totalItemsInCart})</Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-gradient-to-br from-indigo-800 to-indigo-700 text-white sticky top-0 z-10">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
        {/* left  */}
        <div className="left px-5 lg:py-0">
          <Link to={"/"}>
            <h2 className="font-bold text-2xl text-center">
              Dis-patch
            </h2>
          </Link>
        </div>
        {/* Search Bar  */}
        <div className="flex justify-center items-center gap-4">
          <SearchBar />
        </div>
        {/* right  */}
        <div className="right flex justify-center px-5 mb-8 lg:mb-0">
          {navList}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
