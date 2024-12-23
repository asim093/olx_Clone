import React from "react";
import google from "../../assets/google.svg";
import Apple from "../../assets/Apple.svg";
import App_gallery from "../../assets/App_gallery.svg";
import footerimage2 from "../../assets/footer_image_2.webp";
import { CiFacebook, CiTwitter, CiPlay1, CiInstagram } from "react-icons/ci";

const Footer = () => {
  return (
    <div>
      <div className="flex  p-6 justify-center gap-10 flex-wrap items-center container mx-auto overflow-hidden">
        {/* Image Section */}
        <div>
          <img src={footerimage2} alt="footer image" className="h-34" />
        </div>

        {/* Text Section */}
        <div className="border-r-2 pr-6">
          <h1 className="font-bold text-2xl sm:text-4xl text-[#002f34] ">
            Try The Olx App
          </h1>
          <p className="font-bold text-[#002f34] text-center mt-4">
            Buy, Sell, and Find just about anything using the app on your
            mobile.
          </p>
        </div>

        {/* App Download Section */}
        <div >
          <p className="font-bold text-[#002f34] ">
            Get your App Today
          </p>
          <div className="flex justify-center items-start mt-5 space-x-2">
            <img src={App_gallery} alt="App Gallery" className="h-5" />
            <img src={google} alt="Google Play" className="h-5" />
            <img src={Apple} alt="App Store" className="h-5" />
          </div>
        </div>
      </div>

      <footer className="footer bg-gray-100 text-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">POPULAR CATEGORIES</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Cars
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Flats for rent
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Mobile Phones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Jobs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">TRENDING SEARCHES</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Bikes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Watches
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Books
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Dogs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">ABOUT US</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    About Dubizzle Group
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    OLX Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    OLX for Businesses
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">FOLLOW US</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <CiFacebook />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <CiTwitter />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <CiPlay1 />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <CiInstagram />
                </a>
              </div>
              {/* <h3 className="text-lg font-semibold mb-4">GET YOUR APP TODAY</h3> */}
              <div className="flex flex-wrap mt-2 lg:flex-nowrap 	 space-x-2 mb-4">
                <img src={App_gallery} alt="App Store" className="h-10 mt-2" />
                <img src={google} alt="Google Play" className="h-10 mt-2" />
                <img src={Apple} alt="AppGallery" className="h-10 mt-2 " />
              </div>
            </div>
          </div>
        </div>
        
      </footer>
    </div>
  );
};

export default Footer;
