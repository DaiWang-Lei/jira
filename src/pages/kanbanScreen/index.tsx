import React from "react";
import styled from "@emotion/styled";
import { Spin } from "antd";
import { Drag, Drop, DropChild } from "components/dragAndDrop";
import { ScreenContainer } from "components/lib";
import { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDocumentTitle } from "utils";
import { useKanbans, useReorderKanban } from "utils/kanban";
import { useReorderTask, useTasks } from "utils/task";
import { CreateKanban } from "./createKanban";
import { KanbanColumn } from "./kanbanColumnt";
import { SearchPanel } from "./searchPanel";
import { TaskModal } from "./taskModal";
import {
  useKanbansQueryKey,
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksQuerykey,
  useTasksSearchParams,
} from "./util";

/**
 *
 * @returns
 */
export const KanbanScreen = () => {
  useDocumentTitle("看板列表", false);

  const { data: curProject } = useProjectInUrl();

  const { data: kanbans, isLoading: kanbanLoadingStatus } = useKanbans(
    useKanbansSearchParams()
  );

  const { isLoading: taskLoadingStatus } = useTasks(useTasksSearchParams());

  const isLoading = taskLoadingStatus || kanbanLoadingStatus;

  const onDragEnd = useDragEnd();

  // onDragEnd 里做持久化
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{curProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={`kanban${kanban.id}`}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

/**
 *
 */
export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbansSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());

  const { mutate: reorderTask } = useReorderTask(useTasksQuerykey());
  const { data: allTasks } = useTasks(useTasksSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        // if (fromKanbanId === toKanbanId) { //修复同看板列表不能排序问题
        //   return;
        // }
        if (!allTasks) {
          return;
        }
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        const type =
          fromKanbanId === toKanbanId && destination.index > source.index
            ? "after"
            : "before";

        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          type,
          fromKanbanId,
          toKanbanId,
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};
