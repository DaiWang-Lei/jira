import { QueryKey, useQueryClient } from "react-query";
import { TasksProps } from "types";
import { reorder } from "./reorder";

// 乐观更新
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old: any) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

// 编辑项目乐观更新
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old: any[]) =>
      old.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

//删除项目乐观更新
export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old: any[]) => old.filter((item) => item.id !== target.id) || []
  );

//添加项目乐观更新
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old: any[]) => [...old, target] || []);

export const useReorderKanbanConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target, old) =>
    reorder({ list: old, ...target })
  );
};
export const useReorderTaskConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as TasksProps[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });
};
