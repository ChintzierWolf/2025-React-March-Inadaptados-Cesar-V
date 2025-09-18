// src/layout/Layout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

// Layout general que envuelve las páginas
const Layout = ({ children }) => {
  return (<div className="layout">
      <Header/>
      <main>{children}</main>
      <Footer/>
      </div>
  );
};

export default Layout;