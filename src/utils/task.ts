import { QueryKey, useMutation, useQuery } from "react-query";
import { TasksProps } from "types";
import { useHttp } from "./http";
import { useAddConfig, useEditConfig } from "./useOptimisticOptions";

export const useTasks = (param?: Partial<TasksProps>) => {
  const ajax = useHttp();
  return useQuery<TasksProps[]>(["tasks", param], () =>
    ajax("tasks", { data: param })
  );
};
// 新增任务
export const useAddTask = (queryKey:QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (params: Partial<TasksProps>) =>
      ajax(`tasks`, { method: "POST", data: params }),
    useAddConfig(queryKey)
  );
};


// 获取任务详细信息
export const useTaskInfo = (id?: number) => {
  const ajax = useHttp();

  return useQuery<TasksProps>(
    ["task", { id }],
    () => ajax(`tasks/${id}`),
    { enabled: Boolean(id) }
  );
};


/**
 * 编辑任务
 * @param queryKey 
 * @returns 任务详细信息
 */
export const useEditTask = (queryKey:QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (params: Partial<TasksProps>) =>
      ajax(`tasks/${params.id}`, { method: "PATCH", data: params }),
    useEditConfig(queryKey)
  );
};