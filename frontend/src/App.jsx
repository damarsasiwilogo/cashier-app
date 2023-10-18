import React from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialData } from "./slices/userSlice";
import { useToast } from "@chakra-ui/react";
import AddProductPage from "./pages/AddProduct";
import Login from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import { ShowProduct } from "./pages/ShowProduct";
import AddCashierPage from "./pages/AddCashier";
import Profile from "./pages/Profile";
import ShowCashierPage from "./pages/ShowCashier";
import CashierProfile from "./pages/CashierProfile";
import ForgotPassword from "./pages/ForgotPass";
import ResetPassword from "./pages/ResetPass";
import { CartPage } from "./pages/CartPage";
import NotFoundPage from "./pages/NotFound";
import TransactionPage from "./pages/TransactionPage";
// import api from "./api";

function App() {
  useEffect(() => {
    document.title = "Kiefci Jagonya Ayam";
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login/" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/add-product/" element={<AddProductPage />} />
        <Route path="/add-cashier/" element={<AddCashierPage />} />
        <Route path="/show-product/" element={<ShowProduct />} />
        <Route path="/show-cashier/" element={<ShowCashierPage />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/cashier-profile/" element={<CashierProfile />} />
        <Route path="/cart/" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/forgot-password/" element={<ForgotPassword />} />
        <Route path="/reset-password/:uniqueCode" element={<ResetPassword />} />
        <Route path="/transactions" element={<TransactionPage />} />
      </Routes>
    </>
  );
}

export default App;
