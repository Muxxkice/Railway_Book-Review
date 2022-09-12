import { createSlice } from "@reduxjs/toolkit";

export const booksSlice = createSlice({
  name: "bookList",
  initialState: {
    book: [],
    user: false,
    token: [],
  },
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload;
    },
    addBooks: (state, action) => {
      state.book.push(action.payload);
    },
    isAuth2: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addBooks, setBook, isAuth2 } = booksSlice.actions;

export default booksSlice.reducer;
