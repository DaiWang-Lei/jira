import { createSlice } from "@reduxjs/toolkit";
import { UserProps } from "pages/Project/searchPanel";
import * as auth from "authProvider";
import { AuthForm, initUser } from "context/authContext";
import { AppDispatch, RootState } from "store";

type StateProps = {
  user: UserProps | null;
};
const initialState: StateProps = {
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

// 登录
export const loginThunk = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));
// 注册
export const registerThunk = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));
// 登出
export const logoutThunk = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));
// 初始化用户
export const initThunk = () => (dispatch: AppDispatch) =>
  initUser().then((user) => dispatch(setUser(user)));
