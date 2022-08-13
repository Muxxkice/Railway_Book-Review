import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./page/Siginup";
import Login from "./page/Login";
import Page404 from "./page/Page404";
import Home from "./page/Home";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
