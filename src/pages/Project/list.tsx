import { Table } from "antd";
import React from "react";
import { UserProps } from "./searchPanel";

type ProjectProps = {
  id: string;
  name: string;
  personId: string;
  organization: string;
  pin: boolean;
};

type ListProps = {
  list: ProjectProps[];
  users: UserProps[];
};

export const ProjectList: React.FC<ListProps> = ({ list, users }) => {
  return (
    <Table
      pagination={false}
      dataSource={list}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
    />
  );
};
