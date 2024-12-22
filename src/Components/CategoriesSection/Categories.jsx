import React from "react";
import CategoriesCard from "../CategoriesCard/CategoriesCard";
import { categorydata } from "../../utils/Categoriesdata";

const Categories = () => {
  return (
    <div className="container mx-auto p-5 cursor-pointer">
      <p className="font-bold text-[#002f34] text-start text-2xl mb-5">All Categories</p>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
        {categorydata.map((item, index) => (
          <CategoriesCard key={index} image={item.image} text={item.name} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
