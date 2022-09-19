import React, { useMemo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { changeUserName, postIcon } from "../api/UserApi";
import { UserName } from "../type/UserType";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { userName } from "../store/userSlice";

// import "./profile.scss";

export const Profile = () => {
  const [flg, setFlg] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const username = useAppSelector((state) => state.user.name);

  const defaultValues = useMemo(() => {
    return {
      name: username,
    };
  }, [userName]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = async (data: UserName) => {
    console.log(data);
    console.log("click");
    const res = await changeUserName(data);
    // setUserName(res);
    dispatch(userName(res));
    setFlg(true);
  };

  // 何も表示されない、成功、失敗の３種類をだせるように
  // 0,1,-1
  // 可読性を高めるにはどうしたらいいか,コードとしての読みやすさ
  // 部品自体が状態を持っている
  // 振る舞いを含めたコンポーネント
  // 画面に描画する

  return (
    <div>
      <h1>Profile</h1>
      <img src="" alt="" />
      {flg ? (
        <div className="success">
          <p>成功</p>{" "}
        </div>
      ) : (
        <></>
      )}
      <p>現在のの名前:{username}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="name"
          placeholder={username}
          {...register("name", { required: true })}
        />
        {errors.name && <span>Name is required</span>}
        <br></br>
        <button type="submit">変更</button>
      </form>
    </div>
  );
};

export default Profile;
