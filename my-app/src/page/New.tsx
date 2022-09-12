import React, { useState, useCallback } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useReview } from "../compornent/useReview";
import { PostBook } from "../type/UserType";
import "./new.scss";

export const New = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { onClickPostbook } = useReview();
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const onSubmit = async (data: PostBook) => {
    console.log(data);
    onClickPostbook(data);
  };

  return (
    <div className="box">
      <div className="new-container">
        <h1>書籍の投稿</h1>
        <form aria-label="form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            placeholder="タイトル"
            {...register("title", { required: true })}
          />
          {errors.title && <span>Title is required</span>}
          <span>*</span>
          <br />
          <label htmlFor="url">URL</label>
          <br />
          <input
            id="url"
            placeholder="URL"
            {...register("url", { required: true })}
          />
          {errors.url && <span>URL is required</span>}
          <span>*</span>
          <br />
          <label htmlFor="detail">Detail</label>
          <br />
          <input
            id="detail"
            placeholder="詳細"
            {...register("detail", { required: true })}
          />
          {errors.detail && <span>Detail is required</span>}
          <span>*</span>
          <br />
          <label htmlFor="review">Review</label>
          <br />
          <input
            id="review"
            placeholder="レビュー"
            {...register("review", { required: true })}
          />
          {errors.review && <span>Detail is required</span>}
          <span>*</span>
          <br />
          <button type="submit" className="btn">
            登録
          </button>
        </form>
      </div>
    </div>
  );
};

export default New;
