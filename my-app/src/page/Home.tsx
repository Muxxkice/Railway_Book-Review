import React, { useEffect, useState } from "react";

import Header from "../compornent/Header";
import { useAuth } from "../compornent/useAuth";
import { useReview } from "../compornent/useReview";

import { BookType } from "../type/UserType";

import { useAppSelector, useAppDispatch } from "../store/hooks";

import "./home.scss";
import { useNavigate } from "react-router-dom";
import { bookId } from "../store/booksSlice";

export const Home = () => {
  const { onClickFetchMore } = useReview();
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const books = useAppSelector((state) => state.posts.book);
  console.log(isAuth);

  // if (books != null) {
  //   return <></>;
  // }

  const ReviewList = books.map((booklog: BookType) => {
    if (books === null) return <></>;

    return (
      <div key={booklog.id} className="booklog-container">
        <div className="booklog-container__book-item">
          <p>タイトル</p>
          <p className="booklog-container__book-item--title">
            <a href={booklog.url}>{booklog.title}</a>
          </p>
          <p>説明</p>
          <p>{booklog.detail}</p>
        </div>
        <div className="booklog-container__review-item">
          <p>レビュー</p>
          <p>{booklog.review}</p>
          <p>レビュワー</p>
          <p>{booklog.reviewer}</p>
        </div>
        <button
          className="booklog-container__button"
          onClick={() => {
            console.log(booklog.id);
            dispatch(bookId(booklog.id));
            navigate(`detail/${booklog.id}`);
          }}
        >
          詳細
        </button>
      </div>
    );
  });

  return (
    <>
      <Header />
      {isAuth ? (
        <main>
          <h1>レビュ一覧</h1>
          {ReviewList}
          <button
            className="booklog-container__button"
            onClick={onClickFetchMore}
          >
            もっとみる
          </button>
        </main>
      ) : (
        "ログインしてください"
      )}
    </>
  );
};

export default Home;
