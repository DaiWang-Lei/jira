import React, { FC, useEffect, useState } from "react";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
};

type SearchPanelProps = {
  users: UserProps[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
};

export const SearchPanel: FC<SearchPanelProps> = ({
  users,
  param,
  setParam,
}) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(eve) => {
            debugger;
            setParam({ ...param, name: eve.target.value });
          }}
        />
        <select
          value={param.personId}
          onChange={(eve) => setParam({ ...param, personId: eve.target.value })}
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
