import { UserProps } from "types/UserProps";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { useQuery } from "react-query";

export const useUser = (param?: Partial<UserProps>) => {
  const ajax = useHttp();
  return useQuery<UserProps[]>(["users", param], () =>
    ajax("users", { data: param })
  );
};
