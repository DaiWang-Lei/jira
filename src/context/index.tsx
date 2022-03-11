import React from "react";
import { AuthProvider } from "./authContext";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};
