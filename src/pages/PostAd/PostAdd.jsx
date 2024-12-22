import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import CategoriesCard from "../../Components/CategoriesCard/CategoriesCard";
import PostCategoryCard from "../../Components/PostCategoryCard/PostCategoryCard";
import { categorydata } from "../../utils/Categoriesdata";

const CategorySelectionPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (name) => {
    navigate(`/Postform/${name}`);
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm p-4 flex justify-start items-center gap-4 ">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <FaArrowLeft />
        </div>
        <div>
          <img src={logo} alt="logo" width={50} />
        </div>
      </header>

      <div className="card_div">
        <h1 className="font-bold text-[#002f34] text-center text-2xl my-5">
          Post Your Add
        </h1>

        <div className="container mx-auto px-10 ">
          <div className=" w-4/5 mx-auto ps-6 my-5 ">
            <p className="font-bold text-[#002f34] text-1xl">Choose Category</p>
          </div>
          <div className="flex justify-center items-center flex-wrap gap-3">
            {categorydata?.map((item, index) => (
              <PostCategoryCard
                img={item.image}
                text={item.name}
                onClick={() => handleCardClick(item.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelectionPage;
