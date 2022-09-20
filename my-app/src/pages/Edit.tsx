import React, { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
// import { RouteComponentProps } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";

import { BookType } from "../type/ReviewType";
import { deleteReview, editReview } from "../api/BookApi";
import Header from "../compornent/Header";

export const Edit = () => {
  const book = useAppSelector((state) => state.posts.detail);

  const defaultValues = useMemo(() => {
    return {
      title: book.title,
      url: book.url,
      detail: book.detail,
      review: book.review,
    };
  }, [book]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookType>({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const id1 = useParams();
  const id = useAppSelector((state) => state.posts.id);
  const onSubmit = async (data: BookType) => {
    console.log(data);
    editReview(id, data);
  };

  return (
    <>
      <Header></Header>
      <h1>Edit</h1>
      <div className="box">
        <div className="new-container">
          <h1>書籍の投稿</h1>
          <form aria-label="form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Title</label>
            <br />
            <input id="title" {...register("title")} />
            <br />
            <label htmlFor="url">URL</label>
            <br />
            <input id="url" {...register("url")} />
            <br />
            <label htmlFor="detail">Detail</label>
            <br />
            <input id="detail" {...register("detail")} />
            <br />
            <label htmlFor="review">Review</label>
            <br />
            <input id="review" {...register("review")} />
            <br />
            <button type="submit" className="btn">
              登録
            </button>
            <button type="submit" className="btn">
              削除
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Edit;
