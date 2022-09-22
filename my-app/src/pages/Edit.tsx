import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
// import { RouteComponentProps } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../store/hooks";

import { BookType } from "../type/ReviewType";
import { deleteReview, editReview } from "../api/BookApi";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Header from "../compornent/Header";
import "./edit.scss";

type FetchState = InitialState | LoadingState | SucsessState | FailState;
type InitialState = undefined;
type LoadingState = { _tag: "loading" };
type SucsessState = { _tag: "success"; data: any };
type FailState = { _tag: "fail" };

const Edit = () => {
  const [fetchState, setFetchState] = useState<FetchState>(undefined);
  const [show, setshow] = useState(false);
  const book = useAppSelector((state) => state.posts.detail);
  const id = book.id;
  const navigate = useNavigate();

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

  const onSubmit = async (data: BookType) => {
    setFetchState({ _tag: "loading" });
    console.log(data);
    const res = await editReview(id, data);
    if (res !== null) {
      {
        _tag: "success";
        data: res;
      }
      console.log(res);
      navigate(`/detail/${id}`);
    } else {
      setFetchState({ _tag: "fail" });
    }
  };

  const onClickDelete = async () => {
    setshow(true);
  };

  const deleteAgree = async () => {
    setFetchState({ _tag: "loading" });
    console.log(id);

    const res = await deleteReview(id);
    if (res === 200) {
      setshow(false);
      setFetchState({ _tag: "loading" });
      console.log(res);
      navigate("/");
    } else {
      console.log("失敗しました");
    }
  };

  const Modal = () => {
    if (show) {
      return (
        <div id="modal">
          <div id="content">
            <p>本当に削除しますか</p>
            <button
              onClick={() => {
                setshow(false);
              }}
            >
              Cancel
            </button>
            <button onClick={deleteAgree}>Agree</button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <Header></Header>
      {/* {fetchState === undefined ?():} */}
      <div className="box" id="overlay">
        <div className="new-container">
          <h1>書籍の編集</h1>
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
            <button type="submit" className="btn_blue">
              編集
            </button>
          </form>
          <button type="submit" className="btn_red" onClick={onClickDelete}>
            削除
          </button>
        </div>
        <Modal />
      </div>
    </>
  );
};

export default Edit;
