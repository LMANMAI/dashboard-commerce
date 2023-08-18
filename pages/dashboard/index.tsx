import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import type, { Menu, MenuProps } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

import { SideMenu, MenuItem } from "./styles";
const DashboardPage = () => {
  const items: MenuProps["items"] = [
    getItem("Navigation One", "sub1", <MailOutlined />, [getItem("Option 1", "1"), getItem("Option 2", "2"),getItem("Option 3", "3"), getItem("Option 4", "4")]), ];
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <div style={{display: 'flex', height: '100vh'}}>
      <SideMenu>
        
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </SideMenu>
     <div style={{width: '100%'}}>
     <Outlet />
     </div>
    </div>
  );
};

export default DashboardPage;
