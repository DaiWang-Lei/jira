import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import { ButtonNoPadding } from "./lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "store/projectListSlice";

export const ProjectPopover = () => {
  const dispatch = useDispatch();

  const { data: projects, isLoading } = useProjects();
  //过滤出收藏的项目
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContailer>
      <Typography.Text>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        type={"link"}
        onClick={() => dispatch(projectListActions.openProjectModal)}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContailer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      项目
    </Popover>
  );
};

const ContentContailer = styled.div`
  min-width: 30rem;
`;