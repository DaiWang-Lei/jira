import { ProjectProps } from "pages/Project/list";
import { useProjectSearchParams } from "pages/Project/util";
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

  const [searchParams] = useProjectSearchParams();
  const queryKey = ["projects", searchParams];
  return useMutation(
    (params: Partial<ProjectProps>) =>
      ajax(`projects/${params.id}`, { method: "PATCH", data: params }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      async onMutate(target) {
        const previousItems = queryClient.getQueriesData(queryKey);
        queryClient.setQueryData(queryKey, (old?: ProjectProps[]) => {
          return (
            old?.map((project) =>
              project.id === target.id ? { ...project, ...target } : project
            ) || []
          );
        });
        return previousItems;
      },
      onError(error, newItem, context) {
        queryClient.setQueryData(
          queryKey,
          (context as { previousItems: ProjectProps[] }).previousItems
        );
      },
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
