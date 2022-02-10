import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMout } from "utils";
import { ProjectList } from "./list";
import { SearchPanel } from "./searchPanel";
import qs from "qs";
import { TsReactTest } from "./try-use-array";

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

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (resp) => {
      if (resp.ok) {
        setList(await resp.json());
      }
    });
  }, [debounceParam]);

  const getUser = () => {
    fetch(`${apiUrl}/users`).then(async (resp) => {
      if (resp.ok) {
        setUsers(await resp.json());
      }
    });
  };
  useMout(getUser);

  return (
    <div>
      {/* <SearchPanel users={users} param={param} setParam={setParam} /> */}
      {/* <ProjectList users={users} list={list} /> */}
      <TsReactTest />
    </div>
  );
};
