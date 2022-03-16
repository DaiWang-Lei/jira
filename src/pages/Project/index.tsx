import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "utils";
import { ProjectList, ProjectProps } from "./list";
import { SearchPanel } from "./searchPanel";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectSearchParams } from "./util";
import { ButtonNoPadding, Row } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "store/projectListSlice";

export const ProjectListPage = () => {
  useDocumentTitle("任务列表", false);
  const dispatch = useDispatch();

  const [param, setParam] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUser();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          type={"link"}
          onClick={() => dispatch(projectListActions.openProjectModal)}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <ProjectList
        refresh={retry}
        loading={isLoading}
        users={users || []}
        list={list || []}
      />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = true;

const Container = styled.div`
  margin: 3.2rem;
`;
