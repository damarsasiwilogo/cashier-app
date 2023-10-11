import React from "react";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialData } from "./slices/userSlice";
import { useToast } from "@chakra-ui/react";
import { Login } from "./pages/Login";
import { HomePage } from "./pages/HomePage";
// import api from "./api";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/Login/"
          element={<Login />}>
        </Route>
        <Route
          path="/"
          element={<HomePage />}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
