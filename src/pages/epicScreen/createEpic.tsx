import styled from "@emotion/styled";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import form from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/userSelect";
import { error } from "console";
import { title } from "process";
import { useEffect } from "react";
import { useAddEpic } from "utils/epic";
import { useEpicsQueryKey, useProjectidInUrl } from "./utils";

export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const [form] = useForm();
  const curProjectId = useProjectidInUrl();
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId: curProjectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>创建任务组</h1>
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
                rules={[{ required: true, message: "请输入任务组名称" }]}
              >
                <Input placeholder="请输入任务组名称" />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={isLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
