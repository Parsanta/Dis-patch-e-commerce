import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const userSignupFunction = async () => {
    // validation
    if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

      // create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        ),
      };

      // create user reference
      const userReference = collection(db, "user");

      // Add User Detail
      await addDoc(userReference, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfully");

      setLoading(false);
      navigate('/login');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-800 to-indigo-700">
      {loading && <Loader />}
      {/* Signup Form  */}
      <div className="signup_Form bg-white mx-4 md:mx-auto mt-16 p-8 border border-gray-200 shadow-md rounded-md w-full max-w-md transform -translate-y-20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
        {/* Top Heading  */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-purple-600">Welcome</h2>
          <p className="text-gray-600">Create your account</p>
        </div>

        {/* Input One  */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                name: e.target.value,
              });
            }}
            className="input-field focus:outline-none focus:border-none"
          />
        </div>

        {/* Input Two  */}
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                email: e.target.value,
              });
            }}
            className="input-field focus:outline-none focus:border-none"
          />
        </div>

        {/* Input Three  */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                password: e.target.value,
              });
            }}
            className="input-field focus:outline-none focus:border-none"
          />
        </div>

        {/* Signup Button  */}
        <div className="mb-8">
          <button
            type="button"
            onClick={userSignupFunction}
            className="btn-primary w-full h-12 transition-all duration-300 hover:bg-purple-800 hover:text-white"
          >
            Signup
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link className="text-purple-600 font-bold" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
