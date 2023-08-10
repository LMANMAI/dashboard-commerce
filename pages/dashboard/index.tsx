import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { SideMenu, MenuItem } from "./styles";
const DashboardPage = () => {
  const sideBarMenuItems = [
    {
      path: "/",
      name: "Inicio",
    },
    {
      path: "add",
      name: "Agregar productos",
    },
    {
      path: "products",
      name: "Mis productos",
    },
    {
      path: "sales",
      name: "Mis ventas",
    },
  ];

  return (
    <div>
      <SideMenu>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <Outlet />
          </div>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Abrir menu
          </label>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {sideBarMenuItems.map((item, index) => (
                <MenuItem>
                  <NavLink
                    key={index}
                    className="button link"
                    to={item.path}
                    title={item.name}
                  >
                    <div className="name link_text">{item.name}</div>
                  </NavLink>
                </MenuItem>
              ))}
            </ul>
          </div>
        </div>
      </SideMenu>
    </div>
  );
};

export default DashboardPage;
