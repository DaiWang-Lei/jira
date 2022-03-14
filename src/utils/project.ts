import { ProjectProps } from "pages/Project/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useProjects = (param?: Partial<ProjectProps>) => {
  const client = useHttp();
  const { running, ...result } = useAsync<ProjectProps[]>();

  const fetchProjectsDatas =()=> client("projects", {
    data: cleanObject(param || {}),
  });
  useEffect(() => {
    running(fetchProjectsDatas(), { retry: fetchProjectsDatas });
  }, [param]);
  return result;
};

// 编辑项目列表
export const useEditProject = () => {
  const { running, ...asyncResult } = useAsync();
  const ajax = useHttp();
  const mutate = (params: Partial<ProjectProps>) => {
    return running(
      ajax(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

// 新增项目
export const useAddProject = () => {
  const { running, ...asyncResult } = useAsync();
  const ajax = useHttp();
  const mutate = (params: Partial<ProjectProps>) => {
    return running(
      ajax(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
