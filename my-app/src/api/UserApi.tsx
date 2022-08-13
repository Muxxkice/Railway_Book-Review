import React from "react";
import axios from "axios";
import { useState } from "react";

const instance = axios.create({
  baseURL: "https://api-for-missions-and-railways.herokuapp.com",
  // baseURL: "https://api-for-missions-and-railways.com", //失敗
  // timeout: 2000,
  // headers: { "Access-Control-Allow-Origin": "*" },
});

type LoginUser = {
  email: string;
  password: string;
};

export const logInUser = async (data: LoginUser) => {
  console.log(data);
  try {
    const res = await instance.post(`/signin`, data);
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
    console.log(e.ErrorMessageJP);
  }
};

type SiginupUser = {
  name: string;
  email: string;
  password: string;
};

export const signUpUser = async (data: SiginupUser) => {
  console.log(data);
  try {
    const res = await instance.post(`/users`, data);
    console.log(res);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    // console.log(error.ErrorMessageJP);
    ErrorHandler(error);
  }
};

export const ErrorHandler = async (error) => {
  const res = await error;
  console.log(res);

  console.log(res.message);
  return (
    <div>
      <p>ログインできませんでした</p>
      <p>{res.message}</p>
    </div>
  );
};
export default ErrorHandler;
