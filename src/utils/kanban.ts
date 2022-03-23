import { QueryKey, useMutation, useQuery } from "react-query";
import { KanbanProps } from "types";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./useOptimisticOptions";

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
export const useAddKanban = (queryKey:QueryKey) => {
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
export const useDeleteKanban = (queryKey:QueryKey) => {
  const ajax = useHttp();
  return useMutation(
    (id: number) =>
      ajax(`kanbans/${id}`, { method: "DELETE"}),
    useDeleteConfig(queryKey)
  );
};