import { useState, useEffect } from "react";
import Compressor from "compressorjs";
import { useCookies } from "react-cookie";

import { getUserInfo, logInUser, signUp, postIcon } from "../api/UserApi";
// import { setDefaultHeader } from "../api/BookApi";
import { setDefaultHeader } from "../api/UserApi";
import { setDefaultHeader_book } from "../api/BookApi";

import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { userIsAuth, isToken, userToken, userName } from "../store/userSlice";
import { LoginUser, SiginupUser } from "../type/UserType";

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies<string>(["userToken"]);
  // const [istoken, setIsToken] = useState<boolean>(false); //トークンの有無
  // const [isAuth, setIsAuth] = useState<boolean>(false); //ログイン判定
  const [icon, setIcon] = useState(); //アイコン
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  useEffect(() => {
    setDefaultHeader(cookies.userToken);
    setDefaultHeader_book(cookies.userToken);
  }, [cookies]);

  useEffect(() => {
    (async () => {
      if (isAuth) {
        const user = await getUserInfo();
        dispatch(userName(user.name));
        return;
      }
    })();
  }, [isAuth]);

  // クッキーはクライアント側でさわれてはいけない
  // サーバーが401になってるにか
  // 401が帰ってきたら失敗、そうでなかったら

  const login = async (data: LoginUser) => {
    const res = await logInUser(data);

    if (res !== null) {
      dispatch(userIsAuth(true));
      setCookie("Token", res);

      dispatch(userToken(cookies.userToken));
      dispatch(isToken(true));
      setDefaultHeader(cookies.userToken);
      setDefaultHeader_book(cookies.userToken);
      navigate("/");
    } else {
      // setIsToken(false);
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
      setDefaultHeader(cookies.userToken);

      if (cookies !== null && icon !== null) {
        new Compressor(icon, {
          quality: 0.6,
          async success(result) {
            console.log(result);
            const formData = new FormData();
            formData.append("file", result);
            const icon_res = await postIcon(icon, cookies.userToken);
            //ブラウザ側で対処するか
            //アップロードした情報がユーザー情報と紐づけて
            console.log(icon_res);
          },

          maxWidth: 400,
          maxHeight: 400,
          mimeType: "image/png", //TYpeについて調べ直し
          error(err) {
            console.log(err.message);
          },
        });
      }
    }
  };

  const logOutUser = () => {
    removeCookie("Token");
    dispatch(userIsAuth(false));
  };

  // 状態の永続化
  // コンテクストapi
  // Redux

  return {
    login,
    signup,
    cookies,
    logOutUser,
  };
};
export default useAuth;
