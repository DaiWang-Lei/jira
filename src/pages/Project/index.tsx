import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import { ProjectList } from "./list";
import { SearchPanel } from "./searchPanel";
import qs from "qs";
import { TsReactTest } from "./try-use-array";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

type userProps = { name: string; id: string };

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListPage = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 500);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam]);

  const getUser = () => {
    client("users").then(setUsers);
  };
  useMount(getUser);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <ProjectList users={users} list={list} />
      {/* <TsReactTest /> */}
    </Container>
  );
};

const Container = styled.div`
  margin-left: 3.2rem;
`;
