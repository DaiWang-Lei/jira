import { useQuery } from "react-query";
import { TasksProps } from "types";
import { useHttp } from "./http";

export const useTasks = (param?: Partial<TasksProps>) => {
  const ajax = useHttp();
  return useQuery<TasksProps[]>(["tasks", param], () =>
    ajax("tasks", { data: param })
  );
};
