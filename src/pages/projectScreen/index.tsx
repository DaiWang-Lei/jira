import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes, Navigate, useLocation } from "react-router";
import { EpicScreen } from "pages/epicScreen";
import { KanbanScreen } from "pages/kanbanScreen";
import { ScreenContainer } from "components/lib";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useSelectedKey = () => {
  const pathUnit = useLocation().pathname.split("/");
  const key = pathUnit[pathUnit.length - 1];
  return key;
};
export const ProjectScreen = () => {
  const routeType = useSelectedKey();
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"/kanban"} element={<KanbanScreen />} />
          <Route path={"/epic"} element={<EpicScreen />} />
          <Route
            path={"*"}
            element={
              <Navigate
                to={window.location.pathname + "/kanban"}
                replace={true}
              />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.div`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
`;
