import styled from "@emotion/styled";
import { Button, Drawer, Spin, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/userSelect";
import { useEffect } from "react";
import {
  useAddProject,
  useEditProject,
  useProjectQueryKey,
} from "utils/project";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { close, projectModalVisible, editingProject, isLoading } =
    useProjectModal();

  const title = editingProject ? "编辑项目" : "创建项目";

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectQueryKey());

  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      width={"100%"}
      visible={projectModalVisible}
    >
      <FormContainer>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <Form
              form={form}
              onFinish={onFinish}
              layout={"vertical"}
              style={{ width: "40rem" }}
            >
              <ErrorBox error={error} />
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder="请输入项目名称" />
              </Form.Item>
              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名称" }]}
              >
                <Input placeholder="请输入部门名称" />
              </Form.Item>
              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName="负责人" />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </FormContainer>
    </Drawer>
  );
};

const FormContainer = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
