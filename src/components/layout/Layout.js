import axios from "axios";
import React, { useEffect } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "300px" }}>
        <Sidebar />
      </div>
      <Content />
    </div>
  );
};

export default Layout;
