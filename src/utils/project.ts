import { ProjectProps } from "pages/Project/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useProjects = (param?: Partial<ProjectProps>) => {
  const client = useHttp();
  const { running, ...result } = useAsync<ProjectProps[]>();

  useEffect(() => {
    running(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};
