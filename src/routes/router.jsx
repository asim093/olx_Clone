import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Home from "../pages/Home/Home";
import CategorySelectionPage from "../pages/PostAd/PostAdd";
import PostAdForm from "../pages/Postform/PostForm";
import ProductPage from "../pages/SingleProduct/SingleProduct";

export const publicroute = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/PostAdd",
    element: <CategorySelectionPage />,
  },
  {
    path: "/Postform/:name",
    element: <PostAdForm />,
  },
  {
    path: "/singleProduct/:id",
    element: <ProductPage />,
  },
]);
