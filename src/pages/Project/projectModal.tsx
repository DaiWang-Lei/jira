import { Button, Drawer } from "antd";

export const ProjectModal = (props: {
  projectModalVisable: boolean;
  onClose: () => void;
}) => {
  const { projectModalVisable, onClose } = props;
  return (
    <Drawer onClose={onClose} width={"100%"} visible={projectModalVisable}>
      <h1>Project Modal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};
