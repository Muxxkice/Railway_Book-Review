import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../compornent/useAuth";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { userName } from "../store/userSlice";
import { getUserName } from "../api/UserApi";
import "./header.scss";

export const Header = () => {
  const { logOutUser } = useAuth();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const username = useAppSelector((state) => state.user.name);
  const istoken = useAppSelector((state) => state.user.isToken);
  const navigate = useNavigate();
  console.log(username);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (isAuth) {
        const user = await getUserName();
        console.log(user);
        if (user !== null) {
          console.log(user);
          dispatch(userName(user));
        }
      }
    })();
  }, [isAuth]);
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
