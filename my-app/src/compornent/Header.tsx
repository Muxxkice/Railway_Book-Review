import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { userIsAuth, isToken, userToken, userName } from "../store/userSlice";
import { getUserName } from "../api/UserApi";
import "./header.scss";

export const Header = () => {
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

  const logOut = () => {
    // removeCookie("Token");
    dispatch(userIsAuth(false));
    dispatch(userToken(""));
    dispatch(userName(""));
    dispatch(isToken(false));
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
        <button type="submit" onClick={logOut}>
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
