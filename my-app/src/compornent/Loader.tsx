import React from "react";
import { Dna } from "react-loader-spinner";
import { Audio, ThreeDots } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// // import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const Loader = () => {
  return (
    <>
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
      <p>Loading...</p>
    </>
  );
};
export default Loader;
