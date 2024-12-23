import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../Config/Firebase/Config.js";
import { addUsername } from "../../redux/Features/Userslice.jsx";

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    dispatch(addUsername(name));

    try {
      if (!email || !password || !name) {
        alert("Please fill all the fields.");
        return;
      }

      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        userId: user.uid, 
      });

      console.log("Document written with ID: ", docRef.id);

      alert("Signup Successful!");
      navigate("/Login");
    } catch (error) {
      console.error("Error: ", error.message);

      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else {
        alert("Error during signup: " + error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center">
            <img src={logo} height={100} width={100} alt="Logo" />
          </div>
          <h2 className="text-2xl font-bold text-[#002f34] text-center my-10">
            Create a new Olx Account
          </h2>

          <form onSubmit={LoginUser} className="space-y-4">
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
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
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
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Signup
            </button>

            <p
              className="text-base text-center font-bold text-[#3a77ff] cursor-pointer"
              onClick={() => navigate("/Login")}
            >
              Already Have an account? Log in
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
