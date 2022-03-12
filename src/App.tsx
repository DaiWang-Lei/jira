import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import { ProjectList } from 'pages/Project/list';
import { ProjectListPage } from "pages/Project";
import { LoginPages } from "pages/login";
import { useAuth } from "context/authContext";
import { AuthenticatedApp } from "authenticatedApp";
import { UnauthenticatedApp } from "unauthenticatedApp";
import { ErrorBoundary } from "components/errorBoundary";
import { FullPageErrorFallback } from "components/lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
