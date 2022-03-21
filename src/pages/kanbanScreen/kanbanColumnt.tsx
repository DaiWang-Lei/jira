import { KanbanProps } from "types";
import { useTasks } from "utils/task";
import { useTaskModal, useTasksSearchParams } from "./util";
import { useTaskTypes } from "utils/taskType";
import { BugTwoTone, CheckSquareTwoTone } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Card } from "antd";
import { SearchPanel } from "./searchPanel";
import { CreateTask } from "./createTask";

const TaskTypeIcon = ({ id }: { id: number }) => {
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
/**
 *
 * @param param0
 * @returns 看板列
 */
export const KanbanColumn = ({ kanban }: { kanban: KanbanProps }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const curProjectTasks = allTasks?.filter(
    (task) => task.kanbanId === kanban.id
  );

  const { startEdit } = useTaskModal();
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TaskContainer>
        {curProjectTasks?.map((task) => (
          <Card
            onClick={() => startEdit(task.id)}
            style={{ marginBottom: "0.5rem", cursor: "pointer" }}
            key={task.id}
          >
            <div> {task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
