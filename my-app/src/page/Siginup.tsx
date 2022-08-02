import React from "react";
import ReactDOM from "react-dom";
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

  const onSubmit = (data: SiginupUser) => console.log(data);

  type SiginupUser = {
    name: string;
    email: string;
    password: string;
  };

  return (
    <div>
      <h1>Signin</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>名前</label>
        <input {...register("name", { required: true })} />
        {errors.name && <span>Name is required</span>}
        <br />
        <label>メールアドレス</label>
        <input {...register("email", { required: true })} />
        {errors.email && <span>Email is required</span>}
        <br />
        <label>パスワード</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <span>Password name is required</span>}
        <br />
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default Signup;
