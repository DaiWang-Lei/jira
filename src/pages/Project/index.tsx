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
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";

export const ProjectListPage = () => {
  useDocumentTitle("任务列表", false);

  const [param, setParam] = useProjectSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUser();
  const { open } = useProjectModal();
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <ProjectList loading={isLoading} users={users || []} list={list || []} />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = false;

const Container = styled.div`
  margin: 3.2rem;
`;
