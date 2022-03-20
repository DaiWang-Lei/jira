import styled from "@emotion/styled";
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
    <div>
      <h1>{curProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
