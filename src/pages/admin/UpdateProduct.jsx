import { useNavigate, useParams } from "react-router";
import myContext from "../../context/MyContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: 'fashion' },
    { name: 'shirt' },
    { name: 'jacket' },
    { name: 'mobile' },
    { name: 'laptop' },
    { name: 'shoes' },
    { name: 'home' },
    { name: 'books' }
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });

    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(db, "product", id));
            const productData = productTemp.data();

            setProduct({
                title: productData?.title,
                price: productData?.price,
                productImageUrl: productData?.productImageUrl,
                category: productData?.category,
                description: productData?.description,
                quantity: productData?.quantity,
                time: productData?.time,
                date: productData?.date,
            });

            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(db, "product", id), product);
            toast.success("Product Updated successfully");
            getAllProductFunction();
            setLoading(false);
            navigate("/admin");
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-800 to-indigo-800">
            {loading && <Loader />}
            <div className="login_Form bg-white px-8 py-6 border border-indigo-300 rounded-xl shadow-md max-w-md w-full">
                <div className="mb-5">
                    <h2 className="text-center text-2xl font-bold text-indigo-600">
                        Update Product
                    </h2>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                title: e.target.value,
                            })
                        }
                        placeholder="Product Title"
                        className="input-field focus:outline-none focus:border-none"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                price: e.target.value,
                            })
                        }
                        placeholder="Product Price"
                        className="input-field focus:outline-none focus:border-none"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="productImageUrl"
                        value={product.productImageUrl}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                productImageUrl: e.target.value,
                            })
                        }
                        placeholder="Product Image Url"
                        className="input-field focus:outline-none focus:border-none"
                    />
                </div>
                <div className="mb-3">
                    <select
                        value={product.category}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                category: e.target.value,
                            })
                        }
                        className="input-field focus:outline-none focus:border-none"
                    >
                        <option disabled>Select Product Category</option>
                        {categoryList.map((value, index) => (
                            <option key={index} value={value.name}>
                                {value.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <textarea
                        value={product.description}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                description: e.target.value,
                            })
                        }
                        name="description"
                        placeholder="Product Description"
                        rows="5"
                        className="input-field focus:outline-none focus:border-none"
                    ></textarea>
                </div>
                <div className="mb-0">
                    <button
                        onClick={updateProduct}
                        type="button"
                        className="btn-primary w-full h-12 transition-all duration-300 hover:bg-indigo-700 hover:text-white"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;
