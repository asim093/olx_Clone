import React, { useEffect, useState } from "react";
import { db, collection, getDocs, query, where } from "../../Config/Firebase/Config.js"; // Import from your custom config
import Card from "../Card/Card.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CardMain = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const searchValue = useSelector((state) => state.user.value); 

  function singleProduct(id) {
    navigate(`/singleProduct/${id}`);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      let productsQuery = collection(db, "Posts");

      if (searchValue) {
        productsQuery = query(
          productsQuery,
          where("adTitle", ">=", searchValue), 
          where("adTitle", "<=", searchValue + '\uf8ff') 
        );
      }

      const productsSnapshot = await getDocs(productsQuery);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsList);
    };

    fetchProducts();
  }, [searchValue]); 

  return (
    <div className="container mx-auto px-5 my-10">
      <p className="text-[#002f34] font-bold text-2xl py-5">Mobile Phones</p>
      <div className="flex justify-between gap-10 flex-wrap sm:justify-between col-nowrap">
        {products.map((product) => (
          <Card
            key={product.id}
            product={product}
            onClick={singleProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default CardMain;
