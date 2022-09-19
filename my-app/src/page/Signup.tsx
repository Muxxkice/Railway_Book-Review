import React, { useState, useCallback, useEffect } from "react";
import Compressor from "compressorjs";
import {
  useForm,
  // SubmitHandler
} from "react-hook-form";
import { useDropzone } from "react-dropzone";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setIcon } from "../store/userSlice";
import { useAuth } from "../compornent/useAuth";
import { SiginupUser } from "../type/UserType";
import "./signup.scss";

export const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SiginupUser>();
  const { signup } = useAuth();

  const dispatch = useAppDispatch();
  const icon_redux = useAppSelector((state) => state.user.icon);

  const [icon, setIcon] = useState();
  const [isIcon, setIsIcon] = useState<boolean>(false); //画像データがあるか
  const [errorMessage, setErrorMessage] = useState<string>(); //エラーメッセージ
  const [previewPath, setPreviewPath] = useState<string>();

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    const file = acceptedFiles[0];
    setPreviewPath(file.path);
    // setPreviewPath(URL.createObjectURL(a));
    setIcon(file);
    // const compresserData = new Compressor(a, {
    //   quality: 0.6,
    //   success(result) {
    //     console.log(result);
    //     setIsIcon(true);
    //     const formData = new FormData();
    //     formData.append("file", result);
    //     // setIcon(result);
    //   },
    //   maxWidth: 400,
    //   maxHeight: 400,
    //   mimeType: "image/png",
    //   error(err) {
    //     console.log(err.message);
    //     setErrorMessage(err.message);
    //     setIsIcon(false);
    //   },
    // });
    // console.log(compresserData);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = async (data: SiginupUser) => {
    console.log(icon);
    signup(data, icon);
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
