import React, { useEffect, useState } from "react";
import PageLayout from "../../Components/PageLayout/PageLayout";
import { FaCartArrowDown, FaMapMarkerAlt, FaPhoneAlt, FaShareAlt } from "react-icons/fa";
import { CiChat1 } from "react-icons/ci";
import avatar from "../../assets/avatar.png";
import { FaHeart } from "react-icons/fa6";
import { db } from "../../Config/Firebase/Config.js";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for the current image index

  function shownumber() {
    alert(product.phoneNumber);
    console.log(product);
  }

  // Prev button functionality
  const prev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  // Next button functionality
  const next = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const productDoc = doc(db, "Posts", id);
      const productSnapshot = await getDoc(productDoc);
      if (productSnapshot.exists()) {
        setProduct(productSnapshot.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Carousel Section */}
          <div className="col-span-12 md:col-span-8">
            <div className="carousel w-full">
              {product.images && product.images.length > 0 ? (
                <div key={currentImageIndex} className="carousel-item relative d-flex justify-center items-center w-full">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={`Product Image ${currentImageIndex + 1}`}
                    className="w-4/6  object-cover"
                  />
                  <div className="absolute left-1 right-1 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <button onClick={prev} className="btn btn-circle">❮</button>
                    <button onClick={next} className="btn btn-circle">❯</button>
                  </div>
                </div>
              ) : (
                <div>No images available</div>
              )}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="col-span-12 md:col-span-4 bg-white p-4 mt-10 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <div className="flex-shrink-0 mr-4">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div>
                <p className="text-gray-800 font-semibold">
                  Listed by private user
                </p>
                <p className="text-gray-800">{product.name}</p>
                <p className="text-xs text-gray-500">Member since Sept 2017</p>
                <a href="#" className="text-blue-500 hover:underline">
                  See profile
                </a>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full flex justify-center items-center space-x-2"
                onClick={shownumber}
              >
                <FaPhoneAlt />
                <p>Show phone number</p>
              </button>

              <button className="bg-gray-300 hover:bg-gray-400 mt-2 text-black font-bold py-2 px-4 rounded w-full flex justify-center items-center space-x-2">
                <FaCartArrowDown />
                <p>Add To Cart</p>
              </button>
            </div>
            <div className="border border-blue-950 w-full h-20 mt-5">
              <h2 className="text-black text-2xl font-medium px-2">Location</h2>
              <p className="text-black p-2">{product.location}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold"> Rs {product.price}</h2>
            <div className="flex space-x-2">
              <FaShareAlt />
              <FaHeart />
            </div>
          </div>

          <p className="text-gray-600 mb-2">{product.adTitle}</p>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt />
            <span className="text-gray-600">{product.location}</span>
          </div>
          <p className="text-xs text-gray-500">
            {product.date || "4 days ago"}
          </p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <h2 className="mt-5">
            Phone Number : {product.showPhoneNumber ? product.phoneNumber : ""}
          </h2>
        </div>
      </div>
    </PageLayout>
  );
};

export default SingleProduct;
