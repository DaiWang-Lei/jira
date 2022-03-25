import { QueryKey, useMutation, useQuery } from "react-query";
import { TasksProps } from "types";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderConfig,
} from "./useOptimisticOptions";

export const useTasks = (param?: Partial<TasksProps>) => {
  const ajax = useHttp();
  return useQuery<TasksProps[]>(["tasks", param], () =>
    ajax("tasks", { data: param })
  );
};
// 新增任务
export const useAddTask = (queryKey: QueryKey) => {
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

  return useQuery<TasksProps>(["task", { id }], () => ajax(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

/**
 * 编辑任务
 * @param queryKey
 * @returns 任务详细信息
 */
export const useEditTask = (queryKey: QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (params: Partial<TasksProps>) =>
      ajax(`tasks/${params.id}`, { method: "PATCH", data: params }),
    useEditConfig(queryKey)
  );
};

/**
 * 删除任务
 * @param queryKey
 * @returns
 */
export const useDeleteTask = (queryKey: QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (id: number) => ajax(`tasks/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};

/**
 * 排序的属性类型
 */
export type SortProps = {
  // 要重新排序的item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 放在目标item的前还是后
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId: number;
};
export const useReordTask = (queryKey: QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (params: SortProps) =>
      ajax("tasks/reorder", {
        data: params,
        method: "POST",
      }),
      useReorderConfig(queryKey)
  );
};
