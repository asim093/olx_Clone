import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import sell_icon from "../../assets/sell_icon.jpg";
import avatar from "../../assets/avatar.png";
import { getAuth, signOut } from "firebase/auth";
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import Styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser, SearchInput } from "../../redux/Features/Userslice";

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Pakistan");
  const userLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const InputValue = useDispatch();
  const searchValue = useSelector((state) => state.user.value); 
  const cities = ["Pakistan", "India", "USA", "Canada", "Australia"];

  const handleInputClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const GotoSell = () => {
    if(userLogin === true){
      navigate('/PostAdd')
    }else{
      alert('You need to Login First');
      navigate('/Login')
    }
  }

  const Logoutuser = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        alert("User Logout Successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleCitySelect = () => {
    setSelectedCity(city);
    setIsDropdownVisible(false);
  };

  const handleInputChange = (e) => {
    dispatch(SearchInput(e.target.value));
  };
  return (
    <div className="border-b">
      <div className="container mx-auto px-4  ">
        <div className="flex flex-wrap items-center justify-start gap-4 py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="logo" className="w-16 h-16" />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  className="_5120d4ee"
                  alt="OLX Motors"
                >
                  <path d="M23.75 8.38a1.66 1.66 0 0 0-2.08-1.08l-.92.3-1.59-3.35-.5-.17a24.01 24.01 0 0 0-7.16-1c-2.23-.06-4.44.28-6.54 1.03l-.45.18-1.52 3.5-.64-.2a1.66 1.66 0 1 0-1 3.17l.12.04-.1.18a6.1 6.1 0 0 0-.61 2.26c-.01.37 0 1.11.03 1.83l.01 4v.03c-.02.36.02.73.12 1.08a1.1 1.1 0 0 0 1.11.74H4.4a1.1 1.1 0 0 0 1.1-.74c.1-.35.15-.72.13-1.08v-.44c2.76.25 4.53.37 6.28.37 1.74 0 3.45-.12 6.1-.36v.43c-.02.36.02.73.12 1.08a1.1 1.1 0 0 0 1.11.74h2.37a1.1 1.1 0 0 0 1.11-.74c.1-.35.14-.72.12-1.08l.01-3.96v-.03c.05-.74.1-1.5.1-1.93a5.6 5.6 0 0 0-.64-2.35l-.1-.21.47-.15a1.66 1.66 0 0 0 1.08-2.09zM5.37 5.18h.02c1.96-.69 4.03-1 6.1-.94 2.3-.04 4.6.28 6.8.93l.04.02 1.3 2.74a26.7 26.7 0 0 1-6.42.62h-1.06c-2.69.1-5.37-.05-8.03-.45l1.26-2.92zm-.9 13.92c0 .22-.01.45-.05.66H2a3.25 3.25 0 0 1-.04-.66v-.87c.16.08.33.13.5.15l2.02.18v.54zm17.2-.04v.04c0 .23-.01.45-.05.67h-2.44a3.26 3.26 0 0 1-.03-.67v-.53l1.88-.18c.22-.02.44-.09.63-.2v.87zm.64-9.7l-1.76.57.71 1.43c.3.57.48 1.2.5 1.85.02.37-.03 1.06-.07 1.7h-.01v.2l-.07 1.06c-.01.43-.28 1.05-.7 1.1-4.48.41-6.74.62-9 .62-2.28 0-4.66-.21-9.35-.64-.28-.03-.47-.48-.53-.9-.04-.3-.08-.79-.1-1.3v-.14a25.4 25.4 0 0 1-.02-1.62c.05-.61.21-1.21.48-1.77l.77-1.39-1.47-.46a.5.5 0 0 1 .3-.97l1.63.52.02-.02c2.45.43 4.94.6 7.43.52h2.13a26.8 26.8 0 0 0 6.92-.7l.49-.15L22 8.4a.51.51 0 0 1 .63.33.5.5 0 0 1-.33.64z"></path>
                  <path d="M4.54 12.08a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zm0 2.46a.65.65 0 1 1 0-1.3.65.65 0 0 1 0 1.3zm14.57-2.46a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zm0 2.46a.65.65 0 1 1 0-1.3.65.65 0 0 1 0 1.3zm-11.71.28h8.96v1.15H7.4v-1.15z"></path>
                </svg>
              </div>
              <span>Motors</span>
            </div>
            <div className="flex items-center space-x-2 ">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  className="_5120d4ee"
                  alt="OLX Property"
                >
                  <path d="M22.78 21.81V7.8L15.3 5.3v1.58l5.98 2V21.8H13.8V.7H1.22v21.1h-.6v1.5h22.76v-1.5h-.6zM12.3 4.3v17.5H2.72V2.2h9.58v2.1z"></path>
                  <path d="M7.98 4.37h2.42v1.21H7.98v-1.2zm-3.63 0h2.42v1.21H4.35v-1.2zM7.98 6.8h2.42V8H7.98V6.8zm-3.63 0h2.42V8H4.35V6.8zm3.63 3.62h2.42v1.21H7.98v-1.2zm-3.63 0h2.42v1.21H4.35v-1.2zm3.63 2.42h2.42v1.21H7.98v-1.2zm-3.63 0h2.42v1.21H4.35v-1.2zm3.63 3.63h2.42v1.21H7.98v-1.2zm-3.63 0h2.42v1.21H4.35v-1.2zm13.31-6.05h1.21v1.21h-1.2v-1.2zm-2.42 0h1.21v1.21h-1.2v-1.2zm2.42 2.42h1.21v1.21h-1.2v-1.2zm-2.42 0h1.21v1.21h-1.2v-1.2zm2.42 3.63h1.21v1.21h-1.2v-1.2zm-2.42 0h1.21v1.21h-1.2v-1.2zm2.42 3.63h1.21v1.21h-1.2v-1.2zm-2.42 0h1.21v1.21h-1.2v-1.2z"></path>
                </svg>
              </div>
              <span>Property</span>
            </div>
          </div>
        </div>

        {/* Second row: Inputs */}
        <div
          className={` ${Styles.location_input} flex  justify-between  flex-wrap  items-center gap-5    py-4`}
        >
          {/* Location input with dropdown */}
          <div className="relative flex-shrink-0 	 ">
            <input
              type="text"
              value={selectedCity}
              readOnly
              onClick={handleInputClick}
              className="w-full  h-14 pl-10 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Select your location"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              <IoLocationSharp color="black" size={20} />
            </div>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              {isDropdownVisible ? (
                <IoIosArrowUp color="black" size={30} />
              ) : (
                <IoIosArrowDown color="black" size={30} />
              )}
            </div>
            {isDropdownVisible && (
              <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {cities.map((city, index) => (
                  <div
                    key={index}
                    className="px-4 w-48 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search input */}
          <div
            className={`${Styles.main_input} relative flex items-center flex-grow justify-between`}
          >
            <input
              type="text"
              className=" h-full w-full pl-12 border-none  outline-none border "
              placeholder="Find Cars, Mobile Phones and More"  
              value={searchValue}  
              onChange={handleInputChange}
            />
            <div
              className={`${Styles.search_div}  rounded-md cursor-pointer bg-[#002f34]`}
            >
              <IoIosSearch className="text-white" />
            </div>
          </div>

          {/* Third Div */}
          <div className={`${Styles.sell_icon_div}`}>
            {userLogin ? (
              <div className="dropdown dropdown-end">
                {/* Avatar Button */}
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="User Avatar" src={avatar} />
                  </div>
                </div>

                {/* Dropdown Menu */}
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li onClick={() => navigate("/profile")}>
                    <a className="justify-between">Profile</a>
                  </li>
                  <li onClick={() => navigate('/cart')}>
                    <a>Cart</a>
                  </li>
                  <li onClick={Logoutuser}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className={Styles.login_text}>
                <p>Login</p>
              </div>
            )}

            <div>
              <img
                src={sell_icon}
                alt="logo"
                onClick={GotoSell}
                className={Styles.logo}
              />
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
