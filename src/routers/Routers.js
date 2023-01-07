import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import Signup from "../pages/Signup";
import Shop from "../pages/Shop";
import ProtectedRoute from "./ProtectedRoute";

import AllProducts from "../admin/AllProducts";
import AddProducts from "../admin/AddProducts";
import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="e-market" />} />
      <Route path="e-market" element={<Home />} />
      <Route path="e-market/cart" element={<Cart />} />
      <Route path="e-market/login" element={<Login />} />
      <Route path="e-market/signup" element={<Signup />} />
      <Route path="e-market/shop" element={<Shop />} />
      <Route path="e-market/shop/:id" element={<ProductDetails />} />
      <Route path='e-market/*' element={<ProtectedRoute />}>
        <Route path='checkout' element={<Checkout />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='dashboard/all-products' element={<AllProducts />} />
        <Route path='dashboard/add-product' element={<AddProducts />} />
        <Route path='dashboard/users' element={<Users />} />
      </Route>
    </Routes>
  );
};

export default Routers;