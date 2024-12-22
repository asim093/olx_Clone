import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Categories from "../../Components/CategoriesSection/Categories";
import Slider from "../../Components/Slider/Slider";
import Card from "../../Components/Card/Card";
import CardMain from "../../Components/CardMain/CardMain";
import PageLayout from "../../Components/PageLayout/PageLayout";

const Home = () => {
  return (
    <div>
      <PageLayout>
        <Slider />
        <Categories />
        <CardMain />
      </PageLayout>
    </div>
  );
};

export default Home;
