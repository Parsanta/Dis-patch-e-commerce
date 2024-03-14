import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase/FirebaseConfig";
import {motion} from "framer-motion"
const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const userLoginFunction = async () => {
    // validation
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      try {
        const q = query(
          collection(db, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          toast.success("Login Successfully");
          setLoading(false);
          if (user.role === "user") {
            navigate("/user");
          } else {
            navigate("/admin");
          }
        });
        return () => data;
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-800 to-indigo-700">
      {loading && <Loader />}
      {/* Login Form  */}
      <motion.div initial={{ scale: 0.1 }} animate={{ scale: 1 }}>
        <div className="login_Form bg-white mx-4 md:mx-auto mt-16 p-8 border border-gray-200 shadow-md rounded-md w-full max-w-md transform -translate-y-20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
          {/* Top Heading  */}
          <div className="mb-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl font-bold text-indigo-600"
            >
              Welcome Back!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600"
            >
              Login to your account
            </motion.p>
          </div>

          {/* Input Two  */}
          <div className="mb-6 ">
            <motion.input
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="email"
              value={userLogin.email}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  email: e.target.value,
                });
              }}
              placeholder="Email Address"
              className="input-field focus:outline-none focus:border-none"
            />
          </div>

          {/* Input Three  */}
          <div className="mb-6 ">
            <motion.input
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="password"
              value={userLogin.password}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  password: e.target.value,
                });
              }}
              placeholder="Password"
              className="input-field focus:outline-none focus:border-none"
            />
          </div>

          {/* Signup Button  */}
          <div className="mb-8 animate-fadeIn">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={userLoginFunction}
              type="button"
              className="btn-primary w-full h-12 transition-all duration-300 hover:bg-indigo-800 hover:text-white"
            >
              Login
            </motion.button>
          </div>

          <div className="text-center animate-fadeIn">
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-gray-700"
            >
              Don't have an account?{" "}
              <Link className="text-indigo-600 font-bold" to="/signup">
                Signup
              </Link>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
