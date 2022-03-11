import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { ProjectList, ProjectProps } from "./list";
import { SearchPanel } from "./searchPanel";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";

export const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const { isLoading, error, data: list } = useProjects(param);
  const { data: users } = useUser();

  console.log(isLoading);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <ProjectList loading={isLoading} users={users || []} list={list || []} />
      {/* <TsReactTest /> */}
    </Container>
  );
};

const Container = styled.div`
  margin-left: 3.2rem;
`;
