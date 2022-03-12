import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { UserProps } from "./searchPanel";

export type ProjectProps = {
  id: string;
  name: string;
  personId: string;
  organization: string;
  pin: boolean;
  created: number;
};

export type ListProps = {
  list: ProjectProps[];
  users: UserProps[];
} & TableProps<any>;

export const ProjectList: React.FC<ListProps> = ({ list, users, ...props }) => {
  return (
    <Table
      pagination={false}
      dataSource={list}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={`${project.id}`}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
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
        {
          title: "创建时间",
          render(value, record) {
            return (
              <span>
                {record.created
                  ? dayjs(record.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
