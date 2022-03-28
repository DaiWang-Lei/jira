import { QueryKey, useMutation, useQuery } from "react-query";
import { EpicProps } from "types";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "./useOptimisticOptions";

export const useEpics = (param?: Partial<EpicProps>) => {
  const ajax = useHttp();
  return useQuery<EpicProps[]>(["epics", param], () =>
    ajax("epics", { data: param })
  );
};

/**
 * 新增任务组
 * @param queryKey
 * @returns
 */
export const useAddEpic = (queryKey: QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (params: Partial<EpicProps>) =>
      ajax(`epics`, { method: "POST", data: params }),
    useAddConfig(queryKey)
  );
};

/**
 * 删除任务组
 * @param queryKey
 * @returns
 */
export const useDeleteEpic = (queryKey: QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (id: number) => ajax(`epics/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};

/**
 * 排序的属性类型
 */
export type SortProps = {
  // 要重新排序的 item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 放在目标item的前还是后
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
};
export const useReorderEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("epics/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
};
