import { ProjectProps } from "types/ProjectProps";
import { useProjectSearchParams } from "pages/Project/util";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./useOptimisticOptions";

export const useProjects = (param?: Partial<ProjectProps>) => {
  const ajax = useHttp();
  return useQuery<ProjectProps[]>(["projects", param], () =>
    ajax("projects", { data: param })
  );
};
export const useProjectQueryKey = () => {
  const [searchParams] = useProjectSearchParams();
  return ["projects", searchParams];
};

// 编辑项目列表
export const useEditProject = (queryKey:QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (params: Partial<ProjectProps>) =>
      ajax(`projects/${params.id}`, { method: "PATCH", data: params }),
    useEditConfig(queryKey)
  );
};

// 新增项目
export const useAddProject = (queryKey:QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (params: Partial<ProjectProps>) =>
      ajax(`projects`, { method: "POST", data: params }),
    useAddConfig(queryKey)
  );
};

// 删除项目
export const useDeleteProject = (queryKey:QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (id: number) =>
      ajax(`projects/${id}`, { method: "DELETE"}),
    useDeleteConfig(queryKey)
  );
};
// 获取项目详细信息
export const useProjectInfo = (id?: number) => {
  const ajax = useHttp();

  return useQuery<ProjectProps>(
    ["project", { id }],
    () => ajax(`projects/${id}`),
    { enabled: Boolean(id) }
  );
};
