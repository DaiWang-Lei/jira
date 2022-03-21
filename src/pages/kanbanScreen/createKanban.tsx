import { Input } from "antd";
import { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { ColumnsContainer } from ".";
import { Container } from "./kanbanColumnt";
import { useKanbansQueryKey, useProjectidInUrl } from "./util";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectidInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };
  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(eve) => setName(eve.target.value)}
      />
    </Container>
  );
};
