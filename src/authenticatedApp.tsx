import { useAuth } from "context/authContext";
import { ProjectListPage } from "pages/Project";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <>
      <button onClick={logout}>登出</button>
      <ProjectListPage />
    </>
  );
};
