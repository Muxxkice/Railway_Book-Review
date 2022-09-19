import React, { useState, useCallback } from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import { useAuth } from "../compornent/useAuth";
import { LoginUser } from "../type/UserType";
import "./login.scss";

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { login } = useAuth();
  const [error, setError] = useState<string>();

  const onSubmit = async (data: LoginUser) => {
    login(data);
  };

  return (
    <div className="box">
      <div className="login-container">
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
        <p>登録する</p>
        <button type="submit">
          <Link to="/signup">Signup</Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
