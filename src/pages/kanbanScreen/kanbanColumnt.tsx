import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { Drag, Drop, DropChild } from "components/dragAndDrop";
import { Row } from "components/lib";
import React from "react";
import { KanbanProps } from "types";
import { useDeleteKanban } from "utils/kanban";
import { useTasks } from "utils/task";
import { CreateTask } from "./createTask";
import { TaskCard } from "./taskCard";
import { TaskTypeIcon } from "./taskTypeIcon";
import { useKanbansQueryKey, useTaskModal, useTasksSearchParams } from "./util";

const More = ({ kanban }: { kanban: KanbanProps }) => {
  const { mutate } = useDeleteKanban(useKanbansQueryKey());
  const startDelete = () => {
    Modal.confirm({
      title: "确定删除看板吗？",
      content: "点击下方确定按钮删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        return mutate(kanban.id);
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button onClick={startDelete} type={"link"}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

/**
 *
 * @param 看板相关详细信息
 * @returns 看板列
 */
export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: KanbanProps }
>(({ kanban, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const curProjectTasks = allTasks?.filter(
    (task) => task.kanbanId === kanban.id
  );
  return (
    <Container ref={ref} {...props}>
      <Row between>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} key={kanban.id} />
      </Row>
      <TaskContainer>
        <Drop type={"ROW"} direction={"vertical"} droppableId={`${kanban.id}`}>
          <DropChild style={{ minHeight: "1rem" }}>
            {curProjectTasks?.map((task, taskIndex) => (
              <Drag
                key={task.id}
                index={taskIndex}
                draggableId={`task${task.id}`}
              >
                <div ref={ref}>
                  <TaskCard key={task.id} task={task} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  );
});

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
