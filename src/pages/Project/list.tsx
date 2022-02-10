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
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
