import { useParams } from "react-router";
import Layout from "../../components/Layout/Layout";
import Category from "../../components/category/Category";
import { useContext } from "react";
import myContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, loadCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";

const CategoryPage = () => {
  const { categoryname } = useParams();

  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  const navigate = useNavigate();

  const filterProduct = getAllProduct.filter((obj) =>
    obj.category.includes(categoryname)
  );
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isItemInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const handleAddToCart = (item) => {
    if (isItemInCart(item.id)) {
      dispatch(removeFromCart(item.id)); 
      toast.success("Removed from cart");
    } else {
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
    <Layout>
      <Category />
      <div className="mt-5">
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">
            {categoryname}
          </h1>
        </div>
        <div>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div>{loading && <Loader />}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filterProduct.length > 0 ? (
                  <>
                    {filterProduct.map((item, index) => {
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
                                    className="text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-2 rounded-md focus:outline-none"
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
                  </>
                ) : (
                  <div>
                    <h1 className="text-center text-gray-500">
                      No product found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
