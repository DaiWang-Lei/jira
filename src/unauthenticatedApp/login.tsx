import { Button, Form, Input } from "antd";
import { useAuth } from "context/authContext";
import { FormEvent } from "react";
import { LongButton } from "unauthenticatedApp";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginPages = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { user, login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) =>
    login(values).catch(onError);
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
