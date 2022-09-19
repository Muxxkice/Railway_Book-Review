import { useState, useEffect } from "react";
import Compressor from "compressorjs";
import { useCookies } from "react-cookie";

import { getUserName, logInUser, signUp, postIcon } from "../api/UserApi";
// import { setDefaultHeader } from "../api/BookApi";
import { setDefaultHeader } from "../api/UserApi";
import { setDefaultHeader_book } from "../api/BookApi";

import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  userIsAuth,
  isToken,
  userToken,
  userName,
  setIcon,
} from "../store/userSlice";
import { LoginUser, SiginupUser } from "../type/UserType";

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies<string>(["Token"]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const istoken = useAppSelector((state) => state.user.isToken);

  useEffect(() => {
    if (isAuth && istoken) {
      setDefaultHeader(cookies.Token);
      setDefaultHeader_book(cookies.Token);
    } else {
      dispatch(userIsAuth(false));
      dispatch(userToken(""));
      dispatch(isToken(false));
    }
  }, [cookies]);

  // クッキーはクライアント側でさわれてはいけない
  // サーバーが401になってるにか
  // 401が帰ってきたら失敗、そうでなかったら

  const login = async (data: LoginUser) => {
    const res = await logInUser(data);

    if (res !== null && res !== 401) {
      setCookie("Token", res);
      dispatch(userToken(cookies.Token));
      dispatch(userIsAuth(true));
      dispatch(isToken(true));
      setDefaultHeader(cookies.Token);
      setDefaultHeader_book(cookies.Token);
      navigate("/");
      const user = await getUserName();
      console.log(user);
      dispatch(userName(user));
    } else if (res === 401) {
      console.log(res);
      dispatch(isToken(false));
      dispatch(isToken(false));
    }
  };

  // icon
  // isAuthどちらの場合でも完遂したら定義を見直す
  // あいこんがあるかないかのタイミング
  // 認証ができているかはレスポンスをトリガーにして動かす
  // undifindを含むか含まないかの挙動の違い

  const signup = async (data: SiginupUser, icon) => {
    // console.log(icon);
    const res = await signUp(data);
    //api叩くタイミング
    if (res !== null) {
      setCookie("userToken", res);
      setDefaultHeader(cookies.Token);
      setDefaultHeader_book(cookies.Token);

      dispatch(userIsAuth(true));
      dispatch(userToken(cookies.Token));
      dispatch(isToken(true));

      if (cookies !== null && icon !== null) {
        new Compressor(icon, {
          quality: 0.6,
          async success(result) {
            console.log(result);
            const formData = new FormData();
            formData.append("file", result);
            const icon_res = await postIcon(icon, cookies.Token);
            //ブラウザ側で対処するか
            //アップロードした情報がユーザー情報と紐づけられている
            console.log(icon_res);
            if (icon_res !== null) {
              dispatch(setIcon(icon_res));
            }
          },

          maxWidth: 400,
          maxHeight: 400,
          mimeType: "image/jpeg",
          error(err) {
            console.log(err.message);
          },
        });
      }
    }
  };

  // 状態の永続化
  // コンテクストapi
  // Redux

  return {
    login,
    signup,
    cookies,
  };
};
export default useAuth;
