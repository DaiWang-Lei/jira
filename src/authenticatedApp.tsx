import styled from "@emotion/styled";
import { useAuth } from "context/authContext";
import { ProjectListPage } from "pages/Project";
import { ReactComponent as HeadImg } from "assets/software-logo.svg";
import { ButtonNoPadding, Row } from "components/lib";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "pages/projectScreen";
import { resetRoute } from "utils";
import { useState } from "react";
import { ProjectModal } from "pages/Project/projectModal";
import { ProjectPopover } from "components/projectPopover";
import { useDispatch } from "react-redux";
import { projectListActions, projectListSlice } from "store/projectListSlice";

export const AuthenticatedApp = () => {
  const [projectModalVisable, setProjectModalVisable] = useState(false);
  const dispatch = useDispatch();
  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding
            type={"link"}
            onClick={() => dispatch(projectListActions.openProjectModal)}
          >
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListPage />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route path={"*"} element={<Navigate to={"/projects"} />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal />
    </Container>
  );
};

const PageHeader = ({ projectButton }: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <HeadImg width={"18rem"} color="rgb(28,123,255)" />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <HeadUser />
      </HeaderRight>
    </Header>
  );
};

const HeadUser = () => {
  const { logout, user } = useAuth();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <Button type="link" onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        hi,{user?.name}
      </Button>
    </Dropdown>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  height: calc(100vh - 6rem);
`;
