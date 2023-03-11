import { Outlet } from "react-router-dom";
import Header from "./Header";
import React from 'react'

function Layout() {
    return (
        <>
        <Header />
        <section className="body-container">
          <Outlet />
        </section>
      </>
    );
}

export default Layout