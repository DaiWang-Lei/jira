import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalVisible,
} from "store/projectListSlice";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const closeFun = () => dispatch(projectListActions.closeProjectModal);
  return (
    <Drawer
      onClose={closeFun}
      width={"100%"}
      visible={useSelector(selectProjectModalVisible)}
    >
      <h1>Project Modal</h1>
      <Button onClick={closeFun}>关闭</Button>
    </Drawer>
  );
};
