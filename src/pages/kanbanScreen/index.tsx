import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import { CreateKanban } from "./createKanban";
import { KanbanColumn } from "./kanbanColumnt";
import { SearchPanel } from "./searchPanel";
import { TaskModal } from "./taskModal";
import {
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表", false);

  const { data: curProject } = useProjectInUrl();

  const { data: kanbans, isLoading: kanbanLoadingStatus } = useKanbans(
    useKanbansSearchParams()
  );

  const { isLoading: taskLoadingStatus } = useTasks(useTasksSearchParams());

  const isLoading = taskLoadingStatus || kanbanLoadingStatus;
  return (
    <ScreenContainer>
      <h1>{curProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
