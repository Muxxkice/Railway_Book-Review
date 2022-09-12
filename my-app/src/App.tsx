import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppSelector } from "../src/store/hooks";

import Signup from "./page/Signup";
import Login from "./page/Login";
import Home from "./page/Home";
import Test from "./compornent/Test";
import Profile from "./page/Profile";
import New from "./page/New";
import Edit from "./page/Edit";
import Detail from "./page/Detail";
import Error from "./page/Error";
import Page404 from "./page/Page404";

export const App = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  console.log(isAuth);

  // console.log(`a:${a}`);
  // const { isAuth } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
          // element={isAuth ? <Home /> : <Login />}
        ></Route>
        <Route
          path="/signup"
          element={<Signup />}
          // element={isAuth ? <Navigate to="/" /> : <Signup />}
        ></Route>
        <Route
          path="/login"
          // element={<Login />}
          element={isAuth ? <Home /> : <Login />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/new" element={<New />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/error" element={<Error />}></Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
    // /edit/{id}
  );
};

export default App;
