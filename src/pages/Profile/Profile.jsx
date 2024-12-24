import React, { useEffect, useState } from "react";
import PageLayout from "../../Components/PageLayout/PageLayout";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../Config/Firebase/Config";
import avatar from "../../assets/avatar.png";


const Profile = () => {
  const userdata = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const db = getFirestore(app);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userdata || !userdata.email) {
      toast.error("You are not logged in!");
      navigate("/Login");
      return;
    }

    // Fetch user ads
    const fetchUserAds = async () => {
      try {
        const q = query(
          collection(db, "Posts"),
          where("userid", "==", userdata.userid)
        );
        const querySnapshot = await getDocs(q);
        const userAds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(q);
        setAds(userAds);
      } catch (error) {
        console.error("Error fetching user ads:", error);
        toast.error("Failed to fetch ads. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAds();
  }, [userdata, db, navigate]);

  // Handle deleting an ad
  const handleDelete = async (adId) => {
    try {
      const adDocRef = doc(db, "Posts", adId);
      await deleteDoc(adDocRef);
      // Update the state to remove the deleted ad
      setAds(ads.filter((ad) => ad.id !== adId));
      toast.success("Ad removed successfully!");
    } catch (error) {
      console.error("Error deleting ad:", error);
      toast.error("Failed to delete ad. Please try again later.");
    }
  };

  if (!userdata) return null;

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md my-32 border border-black">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Profile
        </h2>

        <div className="flex items-center mb-6">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <p className="text-lg font-medium text-gray-700">
              Email: {userdata.email}
            </p>
            <p className="text-lg font-medium text-gray-700">
              Password: *******
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Ads</h3>
        {loading ? (
          <p>Loading your ads...</p>
        ) : ads.length === 0 ? (
          <p className="text-gray-600">No ads posted yet.</p>
        ) : (
          <ul>
            {ads.map((ad) => (
              <li
                key={ad.id}
                className="border-b border-gray-300 py-4 flex items-center justify-between"
              >
                <div>
                  <img src={ad.images[0]} width={100} alt="" />
                </div>
                <h4 className="text-lg font-medium text-gray-800">{ad.adTitle}</h4>
                <span className="text-gray-500">Rs{ad.price}</span>
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(ad.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageLayout>
  );
};

export default Profile;
