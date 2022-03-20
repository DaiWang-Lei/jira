import { useQuery } from "react-query";
import { KanbanProps } from "types";
import { useHttp } from "./http";

export const useKanbans = (param?: Partial<KanbanProps>) => {
  const ajax = useHttp();
  return useQuery<KanbanProps[]>(["kanbans", param], () =>
    ajax("kanbans", { data: param })
  );
};
