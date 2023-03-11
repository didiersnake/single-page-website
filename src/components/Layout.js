import { Outlet } from "react-router-dom";

import React from 'react'

function Layout() {
  return (
      <section className="body-container">
          <Outlet /> 
    </section>
    )
}

export default Layout