import { QueryKey, useMutation, useQuery } from "react-query";
import { KanbanProps } from "types";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useReorderKanbanConfig } from "./useOptimisticOptions";

export const useKanbans = (param?: Partial<KanbanProps>) => {
  const ajax = useHttp();
  return useQuery<KanbanProps[]>(["kanbans", param], () =>
    ajax("kanbans", { data: param })
  );
};

/**
 * 新增看板列
 * @param queryKey
 * @returns
 */
export const useAddKanban = (queryKey: QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (params: Partial<KanbanProps>) =>
      ajax(`kanbans`, { method: "POST", data: params }),
    useAddConfig(queryKey)
  );
};

/**
 * 删除看板列
 * @param queryKey
 * @returns
 */
export const useDeleteKanban = (queryKey: QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (id: number) => ajax(`kanbans/${id}`, { method: "DELETE" }),
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
export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
};
