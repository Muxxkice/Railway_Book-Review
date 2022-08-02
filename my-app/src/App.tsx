import React from "react";
// import "./App.css";
import Signup from "./page/Siginup.tsx";
import Signin from "./page/Signin.tsx";

export const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Signup />
      <Signin />
    </div>
  );
};

export default App;
