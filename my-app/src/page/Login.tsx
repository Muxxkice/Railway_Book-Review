import React, { useState } from "react";
import {
  useForm,
  // SubmitHandler
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { logInUser } from "../api/UserApi";

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  type LoginUser = {
    email: string;
    password: string;
  };

  const onSubmit = async (data: LoginUser) => {
    console.log(data);
    const res = await logInUser(data);
    if (res) {
      navigate("/");
    } else {
      alert("ログインできませんでした");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form aria-label="form" onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit" className="btn">
          送信
        </button>
      </form>
      <div>
        <p>{error}</p>
      </div>

      <p>未登録</p>
      <Link to="/signup">登録</Link>
    </>
  );
};

export default Login;
