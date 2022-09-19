import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setDetail } from "../store/booksSlice";
import { getBookDetail } from "../api/BookApi";
import Header from "../compornent/Header";
import Roading from "./Roading";
import { BookType } from "../type/UserType";
import { type } from "@testing-library/user-event/dist/type";
type FetchState = InitialState | LoadingState | SucsessState | FailState;
type InitialState = undefined;
type LoadingState = { _tag: "loading" };
type SucsessState = { _tag: "success"; data: any };
type FailState = { _tag: "fail"; message: string };

export const Detail = () => {
  const [bookDetail, seBookDetail] = useState<Array<BookType>>([]);
  const [log, setLog] = useState();
  const [fetchState, setFetchState] = useState<FetchState>(undefined);

  const id = useAppSelector((state) => state.posts.id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const books1 = useAppSelector((state) => state.posts.detail);

  const id2 = useParams();
  const data = {
    selectBookId: id2.id,
  };

  useEffect(() => {
    (async () => {
      if (id !== null) {
        setFetchState({ _tag: "loading" });
        const res = await getBookDetail(id2.id);
        if (res !== null) {
          setFetchState({ _tag: "success", data: res });
          const detail = [res];
          seBookDetail(detail);
          dispatch(setDetail(detail));
        } else {
          setFetchState({
            _tag: "fail",
            message: "データの取得に失敗しました",
          });
        }
      }
    })();
  }, [id2]);

  const ReviewList = bookDetail.map((booklog: BookType) => {
    return (
      <div key={booklog.id} className="booklog-container">
        <div className="booklog-container__book-item">
          <p>タイトル</p>
          <p className="booklog-container__book-item--title">
            <a href={booklog.url}>{booklog.title}</a>
          </p>
          <p>説明</p>
          <p>{booklog.detail}</p>
        </div>
        <div className="booklog-container__review-item">
          <p>レビュー</p>
          <p>{booklog.review}</p>
          <p>レビュワー</p>
          <p>{booklog.reviewer}</p>
        </div>
        <button
          onClick={() => {
            navigate(`/edit/${booklog.id}`);
          }}
        >
          <Link to={`/edit/${booklog.id}`}></Link>
          編集
        </button>
      </div>
    );
  });

  // ローディング状の管理/
  // ローディング前、ローディング中、ローディング後(成功、失敗(400,401))
  // API叩く前、後、レスポンスが帰ってきた後
  // 一個のケースをに分割していく
  // 状態の持ち主
  // グローバル変数
  // ローカル変数　変数を所持しているのは誰か、
  // ログイン状態を持っているコンポーネントが破棄されてる。
  // 破棄されないようにするか、持ち主をよりグローバルにする(状態管理)

  return (
    <>
      <Header></Header>
      <h1>Detail</h1>
      {fetchState === undefined || fetchState._tag === "loading" ? (
        "ローディング中"
      ) : fetchState._tag === "success" ? (
        <>{ReviewList}</>
      ) : (
        <p>{fetchState.message}</p>
      )}
      <Link to="/">ホームに戻る</Link>
    </>
  );
};

export default Detail;
