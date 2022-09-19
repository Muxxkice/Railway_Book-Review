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
import { userIsAuth, isToken, userToken, setIcon } from "../store/userSlice";

import { SiginupUser } from "../type/UserType";
import "./signup.scss";

export const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SiginupUser>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies<string>(["Token"]);

  const [icon, setIcon] = useState();
  const [isIcon, setIsIcon] = useState<boolean>(false); //画像データがあるか
  const [errorMessage, setErrorMessage] = useState<string>(); //エラーメッセージ
  const [previewPath, setPreviewPath] = useState<string>();

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    const file = acceptedFiles[0];
    setPreviewPath(file.path);
    setIcon(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (data: SiginupUser) => {
    console.log(icon);
    signup(data, icon);
  };

  const signup = async (data: SiginupUser, icon) => {
    // console.log(icon);
    const res = await signUp(data);
    //api叩くタイミング
    if (res !== null) {
      setCookie("userToken", res);
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
              // dispatch(setIcon(icon_res));
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
      navigate("/");
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
        {/* <input type="file" id="icon" onChange={onChangeIcon}></input> */}
        <div className="droparia" {...getRootProps()}>
          <input
            type="file"
            id="icon"
            accept="image/*"
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

      <div>
        {/* <image src={previewPath}></image> */}
        {previewPath}
      </div>
    </div>
  );
};

export default Signup;

//errorsがどのように動いているのか、バリデーションの正当性
// Apiを叩かないとわからない要素とブラウザ側だけでわかるもの
// ユーザーが正しく入力できるようなサポート
