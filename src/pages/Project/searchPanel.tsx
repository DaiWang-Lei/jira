import { jsx } from "@emotion/react";
import { Form, Input, Select } from "antd";
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
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={(eve) => {
            debugger;
            setParam({ ...param, name: eve.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
