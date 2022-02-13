import React from "react";
import { AuthProvider } from "./authContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
