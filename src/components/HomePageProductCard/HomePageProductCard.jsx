import { useNavigate } from "react-router-dom";
import { useContext } from "react"; // Removed unnecessary import
import myContext from "../../context/MyContext";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, loadCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);

  const { loading, getAllProduct } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isItemInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const handleAddToCart = (item) => {
    if (isItemInCart(item.id)) {
      // If item is already in the cart, remove it
      dispatch(removeFromCart(item.id)); // Import removeFromCart action
      toast.success("Removed from cart");
    } else {
      // If item is not in the cart, add it
      dispatch(addToCart(item));
      toast.success("Added to cart successfully!");
    }
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(loadCart(JSON.parse(storedCart)));
    }
  }, [dispatch]);
  return (
    <div className="mt-5">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Bestselling Products
        </h1>
      </div>

      {/* Main */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div>{loading && <Loader />}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {getAllProduct.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              return (
                <div
                  key={index}
                  className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <img
                    onClick={() => navigate(`/productinfo/${id}`)}
                    className="h-48 w-full object-cover"
                    src={productImageUrl}
                    alt="product"
                  />
                  <div className="p-4">
                    <h2 className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                      Brand Name
                    </h2>
                    <h1 className="text-md font-semibold text-gray-900 mb-3">
                      {title}
                    </h1>
                    <p className="text-gray-700 mb-3">
                      {/* Additional product details here */}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-md font-medium text-gray-900">
                        Rs.{price}
                      </p>
                      <div className="flex">
                        {isItemInCart(item.id) ? (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md focus:outline-none"
                          >
                            delete To Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="text-white bg-indigo-800  hover:bg-green-800 px-3 py-2 rounded-md focus:outline-none"
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
