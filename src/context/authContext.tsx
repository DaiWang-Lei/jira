import * as auth from "authProvider";
import { UserProps } from "pages/Project/searchPanel";
import React, { useState } from "react";

type AuthForm = {
  username: string;
  password: string;
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
  const [user, setUser] = useState<UserProps | null>(null);

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));

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