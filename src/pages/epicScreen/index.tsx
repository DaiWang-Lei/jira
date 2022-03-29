import React from "react";
import { Button, List, Modal } from "antd";
import { Row, ScreenContainer } from "components/lib";
import dayjs from "dayjs";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { EpicProps } from "types";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { CreateEpic } from "./createEpic";
import {
  useEpicsQueryKey,
  useEpicsSearchParams,
  useProjectInUrl,
} from "./utils";

export const EpicScreen = () => {
  const { data: curProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicsSearchParams());
  const { data: tasks } = useTasks({ projectId: curProject?.id });

  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const confirmDeleteEpic = (epic: EpicProps) => {
    Modal.confirm({
      title: `确定删除项目组：${epic?.name}吗？`,
      content: "点击下方确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteEpic(epic.id);
      },
    });
  };

  const [epicCreateVisible, setEpicCreateVisible] = useState(false);
  return (
    <ScreenContainer>
      <Row between>
        <h1>{curProject?.name}任务组</h1>
        <Button
          type={"link"}
          onClick={() => {
            setEpicCreateVisible(true);
          }}
        >
          创建任务组
        </Button>
      </Row>
      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type={"link"} onClick={() => confirmDeleteEpic(epic)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                  {tasks
                    ?.filter((task) => task.epicId === epic.id)
                    .map((task) => (
                      <div key={task.id}>
                        <Link
                          to={`/projects/${curProject?.id}/kanban?editingTaskId=${task.id} `}
                        >
                          {task.name}
                        </Link>
                      </div>
                    ))}
                </div>
              }
            />
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => {
          setEpicCreateVisible(false);
        }}
        visible={epicCreateVisible}
      />
    </ScreenContainer>
  );
};
