import { createSlice, current } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    // trueになったあとfalseに落とすタイミング
    isAuth: false,
    token: "", //token
    user_name: "gest", //ユーザーネーム
    icon: "", //アイコン
    current: "", //現在地
    open: false, //アラートの表示、非表示
    message: "", //アラートのメッセージ
  },
  reducers: {
    setIcon: (state, action) => {
      state.icon = action.payload;
    },
    userIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },

    userToken: (state, action) => {
      state.token = action.payload;
    },
    userName: (state, action) => {
      state.user_name = action.payload;
    },
    currentLocation: (state, action) => {
      state.current = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {
  setIcon,
  userIsAuth,
  userToken,
  userName,
  currentLocation,
  setOpen,
  setMessage,
} = userSlice.actions;
export default userSlice.reducer;
