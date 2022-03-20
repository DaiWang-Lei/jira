import { useQuery } from "react-query";
import { TasksProps, TaskTypeProps } from "types";
import { useHttp } from "./http";

export const useTaskTypes = () => {
  const ajax = useHttp();
  return useQuery<TaskTypeProps[]>(["taskTypes"], () => ajax("taskTypes"));
};
