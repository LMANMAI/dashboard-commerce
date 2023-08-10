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
        <label
          htmlFor="my-drawer-2"
          className="btn btn-circle swap swap-rotate drawer-button lg:hidden"
        >
          <input type="checkbox" />
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content">
            <Outlet />
          </div>

          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-60 h-full bg-base-200 text-base-content">
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
          </div>
        </div>
      </SideMenu>
    </div>
  );
};

export default DashboardPage;
