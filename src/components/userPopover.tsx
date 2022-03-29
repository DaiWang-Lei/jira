import React from "react";

import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { useProjectModal } from "pages/Project/util";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";

export const UserPopover = () => {
  const { data: users, isLoading, refetch } = useUser();
  const content = (
    <ContentContailer>
      <Typography.Text>组员</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContailer>
  );
  return (
    <Popover
      placement={"bottom"}
      content={content}
      onVisibleChange={() => refetch()}
    >
      组员
    </Popover>
  );
};

const ContentContailer = styled.div`
  min-width: 30rem;
`;
