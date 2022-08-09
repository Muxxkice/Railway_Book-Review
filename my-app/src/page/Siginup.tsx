import React from "react";
import ReactDOM from "react-dom";
import { signUpUser } from "../api/UserApi.tsx";

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

  const onSubmit = async (data: SiginupUser) => {
    console.log(data);
    const res = await signUpUser(data);
    if (res) {
      alert("登録完了");
    }
  };

  type SiginupUser = {
    name: string;
    email: string;
    password: string;
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>名前</label>
        <input id="name" {...register("name", { required: true })} />
        {errors.name && <span>Name is required</span>}
        <br />
        <label>メールアドレス</label>
        <input id="email" {...register("email", { required: true })} />
        {errors.email && <span>Email is required</span>}
        <br />
        <label>パスワード</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Password name is required</span>}
        <br />
        <button type="submit" className="btn">
          送信
        </button>
      </form>
    </div>
  );
};

export default Signup;

//errorsがどのように動いているのか、バリデーションの正当性
// Apiを叩かないとわからない要素とブラウザ側だけでわかるもの
// ユーザーが正しく入力できるようなサポート
