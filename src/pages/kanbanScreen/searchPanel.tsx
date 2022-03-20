import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskTypeSelect } from "components/taskTypeSelect";
import { UserSelect } from "components/userSelect";
import { useUrlQueryParam } from "utils/url";
import { useTasksSearchParams } from "./util";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const [, setSearchParams] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(eve) =>
          setSearchParams({ ...searchParams, name: eve.target.value })
        }
      />
      <UserSelect
        defaultOptionName="负责人"
        value={searchParams.processorId}
        onChange={(value) =>
          setSearchParams({ ...searchParams, processorId: value })
        }
      />
      <TaskTypeSelect
        defaultOptionName="类型"
        value={searchParams.processorId}
        onChange={(value) => {
          return setSearchParams({ ...searchParams, typeId: value });
        }}
      />
      <Button type={"primary"} onClick={reset}>
        清除筛选
      </Button>
    </Row>
  );
};
