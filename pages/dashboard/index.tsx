import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { SignOutUser } from "../../config/firebase-config";
import {
  PlusCircleOutlined,
  FolderOpenOutlined,
  RiseOutlined,
  MenuOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  SideMenu,
  MenuContainer,
  MenuOpenedButton,
  Container,
  MainWrapper,
} from "./styles";
const DashboardPage = () => {
  const [menustatus, setMenuStatus] = useState<boolean>(false);

  const menu = [
    { icon: FolderOpenOutlined, label: "Mis productos", path: "" },
    { icon: PlusCircleOutlined, label: "Agregar productos", path: "add" },
    { icon: RiseOutlined, label: "Mis estadisticas", path: "sales" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Container>
        <MenuOpenedButton
          title={!menustatus ? `Abrir menu` : "Cerrar menu"}
          menustatus={menustatus}
          onClick={() => {
            setMenuStatus(!menustatus);
          }}
        >
          <MenuOutlined style={{ fontSize: "20px", color: "#FAFAFA" }} />
        </MenuOpenedButton>
        <SideMenu menustatus={menustatus}>
          <MenuContainer menustatus={menustatus}>
            {menu.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  title={item.label}
                  className={() =>
                    `nav_link ${
                      item.path === window.location.pathname.slice(1)
                        ? "active"
                        : ""
                    }`
                  }
                >
                  <item.icon
                    className="icon_link"
                    style={{ fontSize: "16px" }}
                  />
                  <p className="nav_link label">{item.label}</p>
                </NavLink>
              );
            })}

            <div
              title="Cerrar sesión"
              className="logout__button"
              onClick={() => SignOutUser()}
            >
              <LogoutOutlined
                style={{ fontSize: "16px", color: "white" }}
                className="icon_link"
              />
              <p className="nav_link label">Cerrar sesión</p>
            </div>
          </MenuContainer>
        </SideMenu>
      </Container>

      <MainWrapper menustatus={menustatus}>
        <Outlet />
      </MainWrapper>
    </div>
  );
};

export default DashboardPage;
