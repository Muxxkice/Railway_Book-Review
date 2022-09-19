import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setDetail, setLogs } from "../store/booksSlice";
import { getBookDetail, getBooklog } from "../api/BookApi";
import Header from "../compornent/Header";
import Roading from "./Roading";
import { BookType } from "../type/UserType";
import { setEmitFlags } from "typescript";

export const Detail = () => {
  const [bookDetail, seBookDetail] = useState<Array<BookType>>([]);
  const [log, setLog] = useState();
  const [flg, setFlg] = useState(false);
  const id = useAppSelector((state) => state.posts.id);

  // const books = useAppSelector((state) => state.posts.detail);
  // const log1 = useAppSelector((state) => state.posts.logs);

  const id2 = useParams();
  const data = {
    selectBookId: id2.id,
  };

  useEffect(() => {
    (() => {
      if (bookDetail === null) {
        return <Roading></Roading>;
      }
    })();
  }, [flg]);
  // useeffectについて調べる
  // useEffectの役割について調べる
  //

  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      if (id !== null) {
        const detail = await getBookDetail(id2.id);
        const logs = await getBooklog(data);
        console.log(detail);
        console.log(logs);
        if (detail !== null) {
          seBookDetail(detail);
          setFlg(true);
          // dispatch(setDetail(detail));
        }
        if (logs !== null) {
          setLog(logs);
          // dispatch(setLogs(logs));
        }
      }
    })();
  }, [id2]);

  // const ReviewList = bookDetail.map((booklog: BookType) => {
  //   if (books === null) return <></>;

  //   return (
  //     <div key={booklog.id} className="booklog-container">
  //       <div className="booklog-container__book-item">
  //         <p>タイトル</p>
  //         <p className="booklog-container__book-item--title">
  //           <a href={booklog.url}>{booklog.title}</a>
  //         </p>
  //         <p>説明</p>
  //         <p>{booklog.detail}</p>
  //       </div>
  //       <div className="booklog-container__review-item">
  //         <p>レビュー</p>
  //         <p>{booklog.review}</p>
  //         <p>レビュワー</p>
  //         <p>{booklog.reviewer}</p>
  //       </div>
  //     </div>
  //   );
  // });

  return (
    <>
      <Header></Header>
      <h1>Detail</h1>
      {/* {ReviewList} */}
      <p>本の詳細</p>
    </>
  );
};

export default Detail;
