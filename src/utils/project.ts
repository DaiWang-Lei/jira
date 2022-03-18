import { ProjectProps } from "pages/Project/list";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHttp } from "./http";

export const useProjects = (param?: Partial<ProjectProps>) => {
  const ajax = useHttp();
  return useQuery<ProjectProps[]>(["projects", param], () =>
    ajax("projects", { data: param })
  );
};

// 编辑项目列表
export const useEditProject = () => {
  const ajax = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<ProjectProps>) =>
      ajax(`projects/${params.id}`, { method: "PATCH", data: params }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

// 新增项目
export const useAddProject = () => {
  const ajax = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<ProjectProps>) =>
      ajax(`projects`, { method: "POST", data: params }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

// 获取项目详细信息
export const useProjectInfo = (id?: number) => {
  const ajax = useHttp();
  console.log(id);

  return useQuery<ProjectProps>(
    ["project", { id }],
    () => ajax(`projects/${id}`),
    { enabled: Boolean(id) }
  );
};
