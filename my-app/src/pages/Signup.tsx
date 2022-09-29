import React, { useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import Compressor from "compressorjs";
import { useDropzone } from "react-dropzone";
import {
  useForm,
  // SubmitHandler
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUp, postIcon } from "../api/UserApi";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { userIsAuth, userToken, setIcon } from "../store/userSlice";
import { MuiSnackbar } from "../compornent/MuiSnackbar";
import { SiginupUser } from "../type/UserType";
import "./signup.scss";

export const Signup = () => {
  // const [authState, setAuthState] = useState(undefined);
  const [cookies, setCookie] = useCookies<string>(["Token"]); //クッキー
  const [icon, setIcon] = useState<FormData>();
  const [isIcon, setIsIcon] = useState<boolean>(false); //画像データがあるか
  const [errorMessage, setErrorMessage] = useState<string>(); //エラーメッセージ
  const [previewPath, setPreviewPath] = useState<string>(); //プレビュー用]
  const [posticonResult, setposticonResult] = useState(false); //iconのポストが成功したか
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SiginupUser>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    new Compressor(file, {
      quality: 0.6,
      async success(result) {
        const formData = new FormData();
        console.log(result);
        formData.append("file", result, "icon");
        console.log(formData.get("file"));
        setIcon(formData);
        setIsIcon(true);
        const iconurl = URL.createObjectURL(result);
        setPreviewPath(iconurl);
      },
      maxWidth: 300,
      maxHeight: 300,
      mimeType: "image/png",
      error(err) {
        console.log("画像の圧縮の失敗");
        console.log(err.message);
      },
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const onSubmit = async (data: SiginupUser) => {
    console.log(icon);
    signup(data);
  };

  const signUpwithIcon = async () => {
    const icon_res = await postIcon(icon);
    if (icon_res.status === 200) {
      console.log("画像あり＋signUp成功");
      console.log(icon_res);
      dispatch(userIsAuth(true));
      navigate("/");
    } else {
      console.log(icon_res);
      console.log("画像あり＋signUp失敗(画像部分での失敗)");
      setposticonResult(false);
    }
  };

  const signup = async (data: SiginupUser) => {
    const res = await signUp(data);

    if (res !== null) {
      setCookie("Token", res);
      dispatch(userToken(res));
      if (isIcon) {
        signUpwithIcon();
      } else if (isIcon === false) {
        console.log("画像なし＋signUp成功");
        dispatch(userIsAuth(true));
        navigate("/");
      }
    } else {
      console.log("signUp失敗(postIcon前での失敗)");
    }
  };

  return (
    <div className="login-container">
      <h1>Signup</h1>
      <form aria-label="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="名前"
          {...register("name", { required: true })}
        />
        {errors.name && <span>Name is required</span>}
        <span>*</span>
        <br />
        <label htmlFor="email">email</label>
        <input
          id="email"
          placeholder="メールアドレス"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Email is required</span>}
        <span>*</span>
        <br />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="パスワード"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Password name is required</span>}
        <span>*</span>
        <br />
        {/* <input type="file" id="icon" onChange={onChangeIcon}　></input> */}
        <div className="droparia" {...getRootProps()}>
          <input
            type="file"
            id="icon"
            accept=".jpg, .png"
            {...getInputProps()}
            // onChange={onChangeIcon}
          ></input>
          <p>Drag 'n' drop a files here, or click to select files</p>
        </div>
        <br />
        <button type="submit" className="btn">
          送信
        </button>
      </form>
      <p>登録済み</p>
      <button type="submit">
        <Link to="/login">Login</Link>
      </button>
      {previewPath && (
        <div key={previewPath} className="preview">
          <img src={previewPath} />
        </div>
      )}
      <MuiSnackbar />
    </div>
  );
};

export default Signup;

//errorsがどのように動いているのか、バリデーションの正当性
// Apiを叩かないとわからない要素とブラウザ側だけでわかるもの
// ユーザーが正しく入力できるようなサポート
