import { Form, Input } from "antd";
import { UserSelect } from "components/userSelect";
import { FC } from "react";
import { ProjectProps } from "../../types/ProjectProps";
import { UserProps } from "../../types/UserProps";

type SearchPanelProps = {
  users: UserProps[];
  param: Partial<Pick<ProjectProps, "name" | "personId">>;
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
            setParam({ ...param, name: eve.target.value.trim() });
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  );
};
