import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../../Config/Firebase/Config.js";
import Card from "../Card/Card.jsx";
import { useNavigate } from "react-router-dom";

const CardMain = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  function singleProduct(id) {
    navigate(`/singleProduct/${id}`);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "Posts");
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID
        ...doc.data(), // Spread the document data
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

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
