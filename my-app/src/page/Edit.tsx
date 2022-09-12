import React from "react";
import { useParams } from "react-router-dom";

export const Edit = () => {
  const id = useParams();
  console.log(id);
  return (
    <>
      <h1>Detail</h1>
    </>
  );
};
export default Edit;
