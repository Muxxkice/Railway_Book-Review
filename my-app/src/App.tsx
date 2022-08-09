import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./page/Siginup.tsx";
import Login from "./page/Login.tsx";
import { Home } from "./page/Home.tsx";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
