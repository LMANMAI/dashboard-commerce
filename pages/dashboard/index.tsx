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
      <ul>
              {sideBarMenuItems.map((item, index) => (
                <MenuItem>
                  <NavLink
                    key={index}
                    className="button link"
                    to={item.path}
                    title={item.name}
                  >
                    <div className="name link_text ">{item.name}</div>
                  </NavLink>
                </MenuItem>
              ))}
            </ul>
      </SideMenu>  
      <Outlet />
    </div>
  );
};

export default DashboardPage;
