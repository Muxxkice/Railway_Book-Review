import React from "react";
import { Dna } from "react-loader-spinner";
import { Audio, ThreeDots } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// // import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Loader = () => {
  return (
    <>
      <h1>ローディング中</h1>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="pink"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        // wrapperClassName="name"
        visible={true}
      />
    </>
  );
};
export default Loader;
