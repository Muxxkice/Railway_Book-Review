import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const id = useParams();

  return (
    <>
      <h1>Detail</h1>
      <p>本の詳細</p>
    </>
  );
};
export default Detail;
