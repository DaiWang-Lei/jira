import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import { ButtonNoPadding } from "components/lib";
import { Pin } from "components/pin";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import {
  useDeleteProject,
  useEditProject,
  useProjectQueryKey,
} from "utils/project";
import { UserProps } from "./searchPanel";
import { useProjectModal } from "./util";

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
  const { open } = useProjectModal();
  const { mutate } = useEditProject(useProjectQueryKey());
  // 柯里化方式，先消化id
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);

  const { mutate: deleteMutate } = useDeleteProject(useProjectQueryKey());
  const confirmDeleteProject = (id: number) =>
    Modal.confirm({
      title: "确认删除这个项目？",
      content: "点击确定删除",
      onOk() {
        deleteMutate(id);
      },
      okText: "确认",
      cancelText: "取消",
    });
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
                    <Menu.Item key={"edit"} onClick={editProject(project.id)}>
                      修改
                    </Menu.Item>
                    <Menu.Item
                      key={"delete"}
                      onClick={() => confirmDeleteProject(project.id)}
                    >
                      删 除
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
