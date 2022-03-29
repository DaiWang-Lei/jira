import React from "react";
import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { useAddKanban } from "utils/kanban";
import { useAddTask } from "utils/task";
import { Container } from "./kanbanColumnt";
import { useProjectidInUrl, useTasksQuerykey } from "./util";

/**
 * 向看板列新增任务
 * @param 看板id
 * @returns 新增任务卡片
 */
export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);

  const projectId = useProjectidInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksQuerykey());
  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };

  const toggle = () => setInputMode(!inputMode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+新增任务</div>;
  }
  return (
    <Card>
      <Input
        size={"large"}
        onBlur={toggle}
        placeholder={"任务名称"}
        onPressEnter={submit}
        autoFocus={true}
        value={name}
        onChange={(eve) => setName(eve.target.value)}
      />
    </Card>
  );
};
