import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    isAuth: false,
    isToken: false, //トークンの有無
    token: "", //token
    name: "gest", //ユーザーネーム
    icon: "", //アイコン
    cookie: "", //クッキー
  },
  reducers: {
    setIcon: (state, action) => {
      state.icon = action.payload;
    },
    userIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    isToken: (state, action) => {
      state.isToken = action.payload;
    },
    userToken: (state, action) => {
      state.token = action.payload;
    },
    userName: (state, action) => {
      state.name = action.payload;
    },
    cookie: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setIcon, userIsAuth, isToken, userToken, userName, cookie } =
  userSlice.actions;
export default userSlice.reducer;
