import React from "react";
import { FaRegHeart } from "react-icons/fa6";

const Card = ({ product, onClick }) => {
  const {
    id,
    adTitle,
    category,
    description,
    images,
    location,
    name,
    phoneNumber,
    price,
    showPhoneNumber,
  } = product;

  return (
    <div
      className="bg-white shadow-md rounded-md overflow-hidden border p-3 border-gray-300 w-80 cursor-pointer"
      onClick={() => onClick(id)} // Pass the ID to the onClick handler
    >
      <img
        src={images[0]}
        alt={adTitle}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-2">Rs {price}</h2>
          <div>
            <FaRegHeart size={20} />
          </div>
        </div>
        <p className="text-black-700">{adTitle}</p>
        <div className="mt-3">
          <p className="text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
