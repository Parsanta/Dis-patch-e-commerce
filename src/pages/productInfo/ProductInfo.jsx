import Layout from "../../components/Layout/Layout";
import { useContext } from "react";
import myContext from "../../context/MyContext";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, loadCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState("");

  const { id } = useParams();
  const [visibleDescription, setVisibleDescription] = useState(500);

  const handleLoadMore = () => {
    setVisibleDescription(
      (prevVisibleDescription) => prevVisibleDescription + 300
    );
  };
  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(db, "product", id));
      setProduct({ ...productTemp.data(), id: productTemp.id });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div className="">
                <div className="">
                  <img
                    className=" w-full lg:h-[39em] rounded-lg"
                    src={product?.productImageUrl}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                    {product?.title}
                  </h2>
                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>Rs.{product?.price}</span>
                  </p>
                </div>
                <div className="mb-6 " />
                <div className="flex flex-wrap items-center mb-6">
                  {isItemInCart(product.id) ? (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md focus:outline-none"
                    >
                      delete To Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="text-white bg-indigo-800  hover:bg-green-800 px-3 py-2 rounded-md focus:outline-none"
                    >
                      Add To Cart
                    </button>
                  )}
                </div>
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                    Description :
                  </h2>
                  <p>
                    {product?.description?.slice(0, visibleDescription) || ""}
                    {product?.description?.length > visibleDescription && "...."}
                  </p>
                  {product?.description &&
                    visibleDescription <
                      (product?.description?.length || 0) && (
                      <button
                        onClick={handleLoadMore}
                        className="hover:bg-blue-600 text-black px-4 py-2 mt-6 rounded-md border border-outline focus:outline-none"
                      >
                        Load More
                      </button>
                    )}
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductInfo;
