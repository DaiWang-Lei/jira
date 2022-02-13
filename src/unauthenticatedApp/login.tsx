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
    <form onSubmit={handleSubmit}>
      {user ? <div>登录成功，当前用户名为：{user?.name}</div> : null}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
