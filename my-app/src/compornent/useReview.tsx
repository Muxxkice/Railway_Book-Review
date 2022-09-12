import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getReview, fetchMore, postBook, getDetail } from "../api/BookApi";
import { BookType, PostBook } from "../type/UserType";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { addBooks, setBook } from "../store/booksSlice";

export const useReview = () => {
  const [books, setBooks] = useState<Array<BookType>>([]);
  const [bookdetail, setBookDetail] = useState<Array<BookType>>([]);
  const [offset, setOffset] = useState<number>(10); //offsetのカウント
  const [isend, setIsend] = useState<boolean>(false); //本の配列の最後かどうか
  // const [id, setId] = useState<string>(); //本のid
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const books_redux = useAppSelector((state) => state.posts.book);
  // console.log(books_redux);

  useEffect(() => {
    (async () => {
      const res = await getReview();
      setBooks(res);
      dispatch(setBook(res));
    })();
  }, []);
  // プロミスでやる。
  // 即時関数使わない(調べる)

  const onClickFetchMore = async () => {
    const res = await fetchMore(offset);
    setOffset(offset + res.length);
    setBooks([...books, ...res]);
    dispatch(setBook([...books, ...res]));
    // console.log(books_redux);
    if (res.length < 10) {
      setIsend(true);
    }
  };

  const onClickPostbook = async (data: PostBook) => {
    const res = await postBook(data);
    if (res !== null) {
      console.log(res.id);
      const id = res.id;
      // setId(res.id);
      navigate(`/detail/${id}`);
    }
  };

  //詳細ページに飛んだ後に戻ってきた時にどうなっているか
  // 無限スクロール方式の場合の
  // ページをパラネーションとして保持する

  return { books, onClickFetchMore, onClickPostbook };
};
export default useReview;

//
