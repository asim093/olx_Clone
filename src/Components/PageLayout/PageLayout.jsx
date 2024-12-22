import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const PageLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
