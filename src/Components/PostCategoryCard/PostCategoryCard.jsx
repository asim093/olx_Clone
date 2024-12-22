import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Styles from './PostCategoryCard.module.css'

const PostCategoryCard = ({ img, text , onClick  }) => {
  return (
    <div onClick={onClick} className={`border border-slate-400 rounded flex justify-between items-center p-3 h-20 w-full sm:w-1/2 lg:w-1/4 mx-2 ${Styles.card}`} >
      <div className="flex items-center gap-2">
        <img src={img} alt="logo" className="rounded-full h-12 w-12" />
        <p className="text-sm lg:text-base">{text}</p>
      </div>
      <FaArrowRight />
    </div>
  );
};

export default PostCategoryCard;
