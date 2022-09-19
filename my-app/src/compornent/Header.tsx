import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../compornent/useAuth";
// import Login from "../page/Login";
import { useAppSelector } from "../store/hooks";
// import "./header.scss";
export const Header = () => {
  const { logOutUser } = useAuth();

  const isAuth = useAppSelector((state) => state.user.isAuth);
  const username = useAppSelector((state) => state.user.name);
  const navigate = useNavigate();

  const onClickLogout = () => {
    console.log("ログアウト");
    const res = logOutUser();
  };

  if (isAuth) {
    return (
      <header>
        <h1>Book Review</h1>
        <p>こんにちは{username}さん</p>
        <Link to="/">ホーム</Link>
        <Link to="/profile">ユーザー情報</Link>
        <Link to="/login">ログイン</Link>
        <Link to="/new">投稿</Link>
        <button type="submit" onClick={onClickLogout}>
          ログアウト
        </button>
        {/* <Link to="/test">テスト</Link> */}
      </header>
    );
  } else {
    return (
      <header>
        <h1>Book Review</h1>
        <Link to="/">ホーム</Link>
        <Link to="/login">ログイン</Link>
      </header>
    );
  }
};

export default Header;
