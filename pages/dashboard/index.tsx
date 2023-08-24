import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

import {
  HomeOutlined,
  PlusCircleOutlined,
  FolderOpenOutlined,
  RiseOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { SideMenu, MenuContainer, MenuOpenedButton } from "./styles";
const DashboardPage = () => {
  const [menustatus, setMenuStatus] = useState<boolean>(false);
  const menu = [
    { icon: HomeOutlined, label: "Inicio", path: "" },
    { icon: PlusCircleOutlined, label: "Agregar", path: "add" },
    { icon: FolderOpenOutlined, label: "Mis productos", path: "products" },
    { icon: RiseOutlined, label: "Mis ventas", path: "sales" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#cccbc8",
        }}
      >
        <MenuOpenedButton
          menustatus={menustatus}
          onClick={() => {
            setMenuStatus(!menustatus);
          }}
        >
          <MenuOutlined style={{ fontSize: "20px", color: "#3b3c3d" }} />
        </MenuOpenedButton>
        <SideMenu menustatus={menustatus}>
          <MenuContainer menustatus={menustatus}>
            {menu.map((item) => {
              return (
                <NavLink to={item.path} className="nav_link">
                  <item.icon
                    className="icon_link"
                    style={{ fontSize: "16px" }}
                  />
                  <p className="nav_link label">{item.label}</p>
                </NavLink>
              );
            })}
          </MenuContainer>
        </SideMenu>
      </div>
      <div style={{ width: "100%", paddingLeft: "5px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
