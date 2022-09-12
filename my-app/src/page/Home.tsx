import React, { useEffect, useState } from "react";

import Header from "../compornent/Header";
import { useAuth } from "../compornent/useAuth";
import { useReview } from "../compornent/useReview";
import { BookType } from "../type/UserType";
import Test from "../compornent/Test";

import { useAppSelector } from "../store/hooks";

import "./home.scss";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { books, onClickFetchMore } = useReview();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  const [count, setCount] = useState<number>(0);
  if (books != null) {
  }

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
            // navigate(`detail/${booklog.id}`);
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
