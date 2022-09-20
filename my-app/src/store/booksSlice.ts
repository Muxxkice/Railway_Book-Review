import { createSlice } from "@reduxjs/toolkit";

interface DetailState {
  title: string;
  url: string;
  detail: string;
  review: string;
  isMine: boolean;
}
export const booksSlice = createSlice({
  name: "bookList",
  initialState: {
    book: [],
    id: "",
    detail: { title: "", url: "", detail: "", review: "", isMine: false },
  },
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload;
    },
    addBooks: (state, action) => {
      state.book.push(action.payload);
    },
    bookId: (state, action) => {
      state.book = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const { addBooks, setBook, bookId, setDetail } = booksSlice.actions;

export default booksSlice.reducer;
