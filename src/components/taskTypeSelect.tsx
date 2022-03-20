import React from "react";
import { useTaskTypes } from "utils/taskType";
import { IdSelect } from "./idSelect";

type IdSelectProps = React.ComponentProps<typeof IdSelect>;
export const TaskTypeSelect = (props: IdSelectProps) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};
