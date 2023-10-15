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
import Profile from "./pages/Profile"
// import api from "./api";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login/" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/add-product/" element={<AddProductPage />} />
        <Route path="/add-cashier/" element={<AddCashierPage />} />
        <Route path="/show-product/" element={<ShowProduct />} />
        <Route path="/profile/" element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default App;
