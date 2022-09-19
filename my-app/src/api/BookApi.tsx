import React from "react";
import axios from "axios";
import { BookType, PostBook } from "../type/UserType";
import { Error } from "../pages/Error";

axios.defaults.baseURL = "https://api-for-missions-and-railways.herokuapp.com";
export const setDefaultHeader_book = (data: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${data}`;
};

export const getReview = async () => {
  try {
    const res = await axios.get(`/books?offset`);
    if (res.status === 200) {
      console.log(res);
      return res.data;
    }
  } catch (error) {
    console.log(error);
    return <Error message={error.ErrorMessageJP} />;
    // 例外を投げ返す
  }
};

export const fetchMore = async (offset: number) => {
  // console.log(offset);
  try {
    const res = await axios.get(`/books?offset=${offset}`);
    // console.log(res);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const postBook = async (data: PostBook) => {
  try {
    const res = await axios.post(`/books`, data);
    if (res.status === 200) {
      console.log(res);
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDetail = async (id) => {
  try {
    const res = await axios.get(`/books/${id}`);
    if (res.status === 200) {
      console.log(res);
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
//本の詳細
export const getBookDetail = (id: string) => {
  console.log(id);
  return axios
    .get(`/books/${id}`)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log(res);
        return res.data;
      } else {
        return null;
      }
    })
    .catch((e) => {
      console.log(e);
      console.log(e.ErrorMessageJP);
      return <Error message={e.ErrorMessageJP} />;
    });
};

// ログを送る
export const postBooklog = (id: string) => {
  console.log(id);
  const data = {
    selectBookId: id,
  };
  return axios
    .post(`/logs`, data)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        return res.data;
      } else {
        return null;
      }
    })
    .catch((e) => {
      console.log(e);
      console.log(e.ErrorMessageJP);
      return <Error message={e.ErrorMessageJP} />;
    });
};
