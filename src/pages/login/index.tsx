import { FormEvent } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginPages = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (resp) => {
      if (resp.ok) {
      }
    });
  };
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
