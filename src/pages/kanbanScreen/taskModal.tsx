import { Form, Input, LayoutProps, Modal, Spin } from "antd";
import { FormLayout, useForm } from "antd/lib/form/Form";
import { TaskTypeSelect } from "components/taskTypeSelect";
import { UserSelect } from "components/userSelect";
import { useEffect } from "react";
import { useEditTask } from "utils/task";
import { useTaskModal, useTasksQuerykey } from "./util";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
/**
 *
 * @returns 任务弹窗
 */
export const TaskModal = () => {
  const [form] = useForm();
  const { close, isLoading, editingTask, editingTaskId } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQuerykey()
  );

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };
  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);
  return (
    <Modal
      forceRender={true}
      visible={!!editingTaskId}
      okText={"确认"}
      cancelText={"取消"}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect defaultOptionName="类型" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
