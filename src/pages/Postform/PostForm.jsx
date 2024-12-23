import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../Config/Firebase/Config";
import { useParams } from "react-router-dom";

const VehicleForm = () => {
  const Myname = useSelector((state) => state.user.name);
  const [Images, Setimages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const { name } = useParams();
  const [userId, Setuserid] = useState();
  const auth = getAuth();
  const db = getFirestore(app);
  const [formData, setFormData] = useState({
    category: name,
    make: "",
    images: [],
    adTitle: "",
    description: "",
    location: "",
    price: "",
    name: Myname,
    phoneNumber: "",
    showPhoneNumber: true,
  });

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        console.log("Current User:", currentUser.uid);
        Setuserid(currentUser.uid)
      } else {
        console.log("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePhoneVisibility = () => {
    setFormData((prev) => ({
      ...prev,
      showPhoneNumber: !prev.showPhoneNumber,
    }));
  };

  const imagesclick = () => {
    if (Images.length === 0) return;

    setImageUploading(true);
    const newImages = Images.filter(
      (image) => !uploadedImages.includes(image.name)
    );

    if (newImages.length === 0) {
      console.log("No new images to upload");
      setImageUploading(false);
      return;
    }

    const uploadPromises = newImages.map((image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "MyAppimages");
      formData.append("cloud_name", "dg5m042zm");

      return fetch("https://api.cloudinary.com/v1_1/dg5m042zm/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setUploadedImages((prev) => [...prev, image.name]);
          return data.url;
        })
        .catch((err) => {
          console.error("Error uploading images:", err);
          return null;
        });
    });

    Promise.all(uploadPromises)
      .then((urls) => {
        const successfulUrls = urls.filter((url) => url !== null);
        setFormData((prev) => ({
          ...prev,
          images: successfulUrls,
        }));
        setImageUploading(false);
        setSuccessMessage("Images uploaded successfully.");
      })
      .catch((err) => {
        console.error("Error uploading images:", err);
        setImageUploading(false);
        setErrorMessage("Error uploading images.");
      });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    Setimages((prevImages) => [...prevImages, ...files]);
  };

  const firebasedata = async () => {
    const docRef = await addDoc(collection(db, "Posts"), {
      userid : userId,
      category: formData.category,
      images: formData.images,
      adTitle: formData.adTitle,
      description: formData.description,
      location: formData.location,
      price: formData.price,
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      showPhoneNumber: formData.showPhoneNumber,
    });

    console.log("Document written with ID: ", docRef.id);
    setSuccessMessage("Ad posted successfully.");
    setLoading(false);
    setFormData({
      category: "Vehicles",
      make: "",
      images: [],
      adTitle: "",
      description: "",
      location: "",
      price: "",
      name: Myname,
      phoneNumber: "",
      showPhoneNumber: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      await imagesclick();

      if (formData.images.length === 0) {
        setErrorMessage("No images uploaded.");
        setLoading(false);
        return;
      }
      await firebasedata().then(() => {
        successMessage = "Post Add Successfully";
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      setLoading(false);
      setErrorMessage("Error posting ad.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md my-5">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-4xl text-center">
        Post Your Ad
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <div className="flex items-center">
            <span className="bg-yellow-200 p-2 rounded-l-md text-gray-800">
              {name}
            </span>
          </div>
        </div>

        {/* Upload Images */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Images
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="relative">
                <input
                  type="file"
                  id={`file-upload-${index}`}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor={`file-upload-${index}`}
                  className="w-16 h-16 border border-dashed border-gray-400 flex items-center justify-center rounded-md hover:border-gray-600 cursor-pointer"
                >
                  +
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Loader (Spinner) */}
        {imageUploading && (
          <div className="flex justify-center my-4">
            <div className="spinner-border animate-spin border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
          </div>
        )}

        {/* Ad Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Ad Title
          </label>
          <input
            type="text"
            name="adTitle"
            value={formData.adTitle}
            onChange={handleChange}
            placeholder="Mention the key features of your item"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the item you're selling"
            rows={4}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Location
          </label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="" disabled>
              Select Location
            </option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Price"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        {/* Phone Visibility */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={formData.showPhoneNumber}
            onChange={togglePhoneVisibility}
            className="mr-2"
          />
          <label className="text-gray-700">Show Phone Number</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md w-full"
        >
          Post Ad
        </button>

        {/* Success/Error Messages */}
        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default VehicleForm;
