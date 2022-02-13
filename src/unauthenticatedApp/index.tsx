import { useState } from "react";
import { LoginPages } from "./login";
import { RigisterPages } from "./register";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      {isRegister ? <RigisterPages /> : <LoginPages />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登录" : "注册"}
      </button>
    </>
  );
};
