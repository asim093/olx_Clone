import React from "react";

const CategoriesCard = ({ image, text }) => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="rounded-full h-24 w-24 overflow-hidden">
        <img src={image} alt={text} className="h-full w-full object-cover" />
      </div>
      <div className="font-bold">{text}</div>
    </div>
  );
};

export default CategoriesCard;
