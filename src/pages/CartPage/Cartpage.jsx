import React, { useEffect, useState } from "react";
import PageLayout from "../../Components/PageLayout/PageLayout";
import { db } from "../../Config/Firebase/Config";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast , {Toaster} from 'react-hot-toast';

const Cartpage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userid = useSelector((state) => state.user.data.userid);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndCart = async () => {
      if (userid) {
        const usersCollectionRef = collection(db, "users");
        const userQuery = query(
          usersCollectionRef,
          where("userId", "==", userid)
        );
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0].data();
          const cartIds = userDoc.cart || [];
          console.log("Cart IDs:", cartIds);

          const productPromises = cartIds.map(async (productId) => {
            const productDocRef = doc(db, "Posts", productId);
            const productDoc = await getDoc(productDocRef);
            if (productDoc.exists()) {
              return { id: productId, ...productDoc.data() };
            }
          });

          const products = await Promise.all(productPromises);
          console.log("Products:", products);
          setCartItems(products.filter(Boolean));
        }
      } else {
        toast.error("Please sign in to view your cart.");
        navigate("/login");
      }
    };

    fetchUserAndCart();
  }, [userid, navigate]);

  

  const removeFromCart = async (productId) => {
    try {
      const userQuery = query(
        collection(db, "users"),
        where("userId", "==", userid)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userDocId = userSnapshot.docs[0].id;
        const userDocData = userSnapshot.docs[0].data();
        const updatedCart = userDocData.cart.filter((id) => id !== productId);

        toast.success("Item removed from cart!");
        const userDocRef = doc(db, "users", userDocId);
        await updateDoc(userDocRef, { cart: updatedCart });

        setCartItems(cartItems.filter((item) => item.id !== productId));

        // Show success toast notification
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);

      // Show error toast notification
      toast.error("Failed to remove item from cart.");
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-center font-bold mb-4">Your Cart</h1>
        <Toaster position="top-right" reverseOrder={false} />
        {cartItems.length > 0 ? (
          <div className="flex flex-col gap-6">
            {cartItems.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row md:items-center gap-5 py-6 group"
              >
                {/* Product Image */}
                <div className="w-full md:max-w-[126px]">
                  <img
                    src={
                      product.images
                        ? product.images[0]
                        : "https://pagedone.io/asset/uploads/1701162850.png"
                    }
                    alt={product.adTitle}
                    className="mx-auto rounded-xl object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex w-full">
                  <div className="flex flex-col justify-center gap-3 items-start">
                    <h6 className="font-semibold text-base leading-7 text-black">
                      {product.adTitle}
                    </h6>
                    <h6 className="font-normal text-base leading-7 text-gray-500">
                      {product.category || "Perfumes"}
                    </h6>
                    <h6 className="font-medium text-base leading-7 text-gray-600">
                      Rs {product.price}
                    </h6>
                  </div>

                  <div className="flex justify-end w-full mt-3 items-center md:mt-0">
                    <button
                      className="bg-red-500 text-white px-4 h-10 py-2 rounded hover:bg-red-600"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">Your cart is empty</p>
        )}
      </div>
    </PageLayout>
  );
};

export default Cartpage;
