import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanbanColumnt";
import { SearchPanel } from "./searchPanel";
import { useProjectInUrl } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表", false);

  const { data: curProject } = useProjectInUrl();

  const { data: kanbans } = useKanbans();
  return (
    <ScreenContainer>
      <h1>{curProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-y: scroll;
  flex: 1;
`;
