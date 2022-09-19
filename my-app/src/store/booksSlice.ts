import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
  name: "bookList",
  initialState: {
    book: [],
    id: "",
    detail: [],
    logs: [],
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
    postLogs: (state, action) => {
      state.logs = action.payload;
    },
  },
});

export const { addBooks, setBook, bookId, setDetail, postLogs } =
  booksSlice.actions;

export default booksSlice.reducer;
