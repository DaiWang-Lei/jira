import { BugTwoTone, CheckSquareTwoTone } from "@ant-design/icons";
import { useTaskTypes } from "utils/taskType";

/**
 *
 * @param 任务Id
 * @returns bugIcon||checkIcon
 */
export const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return name === "task" ? (
    <CheckSquareTwoTone />
  ) : (
    <BugTwoTone twoToneColor="red" />
  );
};
