import * as auth from "authProvider";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import React from "react";
import { useQueryClient } from "react-query";
import { UserProps } from "types/UserProps";
import { useMount } from "utils";
import { http } from "utils/http";
import { useAsync } from "utils/useAsync";

type AuthForm = {
  username: string;
  password: string;
};

const initUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: UserProps | null;
      logout: () => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    setData: setUser,
    isPending,
    isLoading,
    isError,
    error,
    running,
  } = useAsync<UserProps | null>();
  const queryClient = useQueryClient();
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));

  useMount(() => {
    running(initUser());
  });

  if (isPending || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, logout, register }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用！");
  }
  return context;
};
