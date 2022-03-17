import { Button, Drawer } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { close, projectModalVisible } = useProjectModal();
  return (
    <Drawer onClose={close} width={"100%"} visible={projectModalVisible}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
