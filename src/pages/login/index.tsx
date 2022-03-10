import { Form, Input, Button } from "antd";
import { useAuth } from "context/authContext";
import { FormEvent } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginPages = () => {
  const { user, login } = useAuth();

  const handleSubmit = (eve: FormEvent<HTMLFormElement>) => {
    eve.preventDefault();
    const { value: username } = eve.currentTarget
      .elements[0] as HTMLInputElement;
    const { value: password } = eve.currentTarget
      .elements[1] as HTMLInputElement;
    login({ username, password });
  };
  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>登录成功，当前用户名为：{user?.name}</div> : null}
      <Form.Item name={"username"}>
        <label htmlFor="username">用户名x</label>
        <Input placeholder="请输入用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name={"password"}>
        <label htmlFor="password">密码</label>
        <Input type="请输入密码" id="password" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">登录</Button>
      </Form.Item>
    </Form>
  );
};
