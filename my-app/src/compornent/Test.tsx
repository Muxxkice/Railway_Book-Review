import React from "react";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { BookType } from "../type/UserType";
import { useReview } from "../compornent/useReview";
import Header from "../compornent/Header";

export const Test = () => {
  const books = useAppSelector((state) => state.posts.book);

  const { onClickFetchMore } = useReview();
  console.log(books);

  const ReviewList = books.map((booklog: BookType) => {
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
        <button className="booklog-container__button">詳細</button>
      </div>
    );
  });
  return (
    <div>
      <Header />
      <h1>テスト</h1>
      {ReviewList}
      <button className="booklog-container__button" onClick={onClickFetchMore}>
        もっとみる
      </button>
    </div>
  );
};

export default Test;
