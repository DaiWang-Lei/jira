import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import { ProjectList } from 'pages/Project/list';
import { ProjectListPage } from "pages/Project";
import { LoginPages } from "pages/login";

function App() {
  return (
    <div className="App">
      <LoginPages />
      {/* <ProjectListPage/> */}
    </div>
  );
}

export default App;
