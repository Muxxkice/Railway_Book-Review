import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import New from "../pages/New";
import Edit from "../pages/Edit";
import Detail from "../pages/Detail";
import Error from "../pages/Error";
import Page404 from "../pages/Page404";

export const Router = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  console.log(isAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {isAuth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </>
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/error" element={<Error />}></Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
