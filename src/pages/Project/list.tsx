import { Dropdown, Menu, Table, TableProps } from "antd";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { useEditProject } from "utils/project";
import { UserProps } from "./searchPanel";
import { useDispatch } from "react-redux";
import { projectListActions } from "store/projectListSlice";

export type ProjectProps = {
  id: number;
  name: string;
  personId: number;
  organization: string;
  pin: boolean;
  created: number;
};

export type ListProps = {
  list: ProjectProps[];
  users: UserProps[];
  refresh?: () => void;
} & TableProps<any>;

export const ProjectList: React.FC<ListProps> = ({ list, users, ...props }) => {
  const { mutate } = useEditProject();
  const dispatch = useDispatch();
  // 柯里化方式，先消化id
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Table
      pagination={false}
      dataSource={list}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
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
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      {" "}
                      <ButtonNoPadding
                        type={"link"}
                        onClick={() =>
                          dispatch(projectListActions.openProjectModal())
                        }
                      >
                        创建项目
                      </ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
