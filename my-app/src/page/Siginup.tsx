import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Compressor from "compressorjs";

import { signUpUser } from "../api/UserApi";
import ErrorHandler from "../api/UserApi";

import {
  useForm,
  // SubmitHandler
} from "react-hook-form";

export const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SiginupUser>();
  const navigate = useNavigate();

  const [icon, setIcon] = useState();
  const [fileName, setFileName] = useState<string>();

  const onSubmit = async (data: SiginupUser) => {
    const res = await signUpUser(data);
    if (res) {
      navigate("/");
      alert("登録完了");
    } else {
      alert("ログインできませんでした");
    }
  };

  const getIcon = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setIcon(file);
    setFileName(file.name);

    const iconImg = new Compressor(icon, {
      quality: 0.6,
      success(result) {
        const formData = new FormData();
        formData.append("file", result, fileName);
        console.log("result");
        console.log(iconImg);
      },
      maxHeight: 400,
      maxWidth: 400,
      error(err) {
        console.log(err.message);
      },
    });
    console.log(iconImg);
  };

  type SiginupUser = {
    name: string;
    email: string;
    password: string;
  };

  return (
    <div>
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
        <label htmlFor="usericon"></label>
        <input
          type="file"
          name="usericon"
          accept="acceptをimage/*"
          onChange={getIcon}
        />
        <br />
        <button type="submit" className="btn">
          送信
        </button>
      </form>
      <p>既に登録済みの場合</p>
      <Link to="/login">ログイン</Link>
    </div>
  );
};

export default Signup;

//errorsがどのように動いているのか、バリデーションの正当性
// Apiを叩かないとわからない要素とブラウザ側だけでわかるもの
// ユーザーが正しく入力できるようなサポート
