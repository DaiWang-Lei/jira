import { UserProps } from "types/UserProps";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useUser = (param?: Partial<UserProps>) => {
  const client = useHttp();
  const { running, ...result } = useAsync<UserProps[]>();
  useEffect(() => {
    running(client("users", { data: cleanObject(param || {}) }));
  }, [param, running, client]);

  return result;
};
