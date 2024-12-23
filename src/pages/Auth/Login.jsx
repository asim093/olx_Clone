import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { app } from "../../Config/Firebase/Config.js"; // Import the initialized Firebase app
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/Features/Userslice";

const Login = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, Setemail] = useState("");
  const dispatch = useDispatch();
  const [password, Setpassword] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const Loginuser = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userid = user.uid;
        alert("User Login successfully");
        dispatch(addUser({email , password , userid }));
        navigate('/')
        console.log(user.uid);
      })
      .catch((error) => {
        alert(error.message)
       
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Toggle Button */}
      <button
        onClick={toggleModal}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
      >
        Open Login Form
      </button>

      {/* Modal */}

      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center ">
            <div>
              <img src={logo} height={100} width={100} alt="" />
            </div>

            <div className="absolute top-4 right-4">
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center w-full my-10">
            <h2 className="text-2xl font-bold text-[#002f34] text-center">
              Login to Your Olx Account
            </h2>
          </div>

          {/* Modal Body (Login Form) */}
          <div className="mt-4">
            <form className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => Setemail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => Setpassword(e.target.value)}
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember Me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                onClick={Loginuser}
              >
                Login
              </button>

              {/* Register Link */}
              <p
                className="text-base text-center font-bold text-[#3a77ff] cursor-pointer"
                onClick={() => navigate("/Signup")}
              >
                New To Olx Create an account?
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
