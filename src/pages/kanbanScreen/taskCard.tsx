import { Card } from "antd";
import { Mark } from "components/mark";
import { TasksProps } from "types";
import { TaskTypeIcon } from "./taskTypeIcon";
import { useTaskModal, useTasksSearchParams } from "./util";

/**
 *
 * @param 任务相关信息
 * @returns 任务卡片
 */
export const TaskCard = ({ task }: { task: TasksProps }) => {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <p>
        <Mark name={task.name} keyword={keyword} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};
