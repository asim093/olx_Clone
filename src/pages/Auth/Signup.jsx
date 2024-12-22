import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { app } from "../../Config/Firebase/Config.js"; // Import the initialized Firebase app
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUsername } from "../../redux/Features/Userslice.jsx";

const Signup = () => {
  const dispath = useDispatch();
  const [email, Setemail] = useState("");
  const [name, Setname] = useState("");
  const [password, Setpassword] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const LoginUser = (e) => {
    dispath(addUsername(name));
    e.preventDefault();
    try {
      if (!email && !password) {
        alert("please fill All the Fields");
        return;
      }
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user.email);
          navigate('/Login')
          alert("signup Successfully");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      alert(error);
    }
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
              Create a new Olx Account
            </h2>
          </div>

          <div className="mt-4">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Your Name"
                  required
                  value={name}
                  onChange={(e) => Setname(e.target.value) }
                />
              </div>
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
                  value={email}
                  onChange={(e) => Setemail(e.target.value)}
                  required
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
                  value={password}
                  onChange={(e) => Setpassword(e.target.value)}
                  required
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
                onClick={LoginUser}
              >
                Login
              </button>

              {/* Register Link */}
              <p
                className="text-base text-center font-bold text-[#3a77ff] cursor-pointer"
                onClick={() => navigate("/Login")}
              >
                Already Have an account ? Log in
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
