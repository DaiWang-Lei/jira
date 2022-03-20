import { Link } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { EpicScreen } from "pages/epicScreen";
import { KanbanScreen } from "pages/kanbanScreen";
export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
        <Route
          path={"*"}
          element={<Navigate to={window.location.pathname + "/kanban"} replace={true} />}
        />
      </Routes>
    </div>
  );
};
