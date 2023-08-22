import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import type, { Menu, MenuProps } from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  FolderOpenOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { SideMenu, MenuContainer } from "./styles";
const DashboardPage = () => {
  const menu = [
    { icon: HomeOutlined, label: "Inicio", path: "" },
    { icon: PlusCircleOutlined, label: "Agregar", path: "add" },
    { icon: FolderOpenOutlined, label: "Mis productos", path: "products" },
    { icon: RiseOutlined, label: "Mis ventas", path: "sales" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideMenu>
        {/* <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        /> */}
        <MenuContainer>
          {menu.map((item) => {
            return (
              <NavLink to={item.path}>
                <Icon
                  type="message"
                  component={item.icon}
                  style={{ fontSize: "16px", color: "#08c" }}
                />
                <p>{item.label}</p>
              </NavLink>
            );
          })}
        </MenuContainer>
      </SideMenu>
      <div style={{ width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
