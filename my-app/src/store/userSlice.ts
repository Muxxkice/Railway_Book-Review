import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: [],
    isAuth: false,
    token: false,
    name: "",
  },
  reducers: {
    setIcon: (state, action) => {
      state.user = action.payload;
    },
    addIcon: (state, action) => {
      state.user.push(action.payload);
    },
    userIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    usertoken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { addIcon, setIcon, userIsAuth, usertoken } = userSlice.actions;
export default userSlice.reducer;
