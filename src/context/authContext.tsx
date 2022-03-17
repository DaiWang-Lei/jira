import * as auth from "authProvider";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { UserProps } from "pages/Project/searchPanel";
import React, { useCallback, useState } from "react";
import { useMount } from "utils";
import { http } from "utils/http";
import { useAsync } from "utils/useAsync";
import { useDispatch, useSelector } from "react-redux";
import {
  initThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  selectUser,
} from "store/authSlice";

export type AuthForm = {
  username: string;
  password: string;
};

export const initUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isPending, isLoading, isError, error, running } =
    useAsync<UserProps | null>();
  const dispatch: (...args: unknown[]) => Promise<UserProps> = useDispatch();

  useMount(() => {
    running(dispatch(initThunk()));
  });

  if (isPending || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<UserProps> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(loginThunk(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(registerThunk(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(logoutThunk()), [dispatch]);

  return {
    user,
    login,
    register,
    logout,
  };
};
