import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { SignOutUser } from "../../config/firebase-config";
import {
  HomeOutlined,
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
    { icon: HomeOutlined, label: "Inicio", path: "" },
    { icon: PlusCircleOutlined, label: "Agregar productos", path: "add" },
    { icon: FolderOpenOutlined, label: "Mis productos", path: "products" },
    { icon: RiseOutlined, label: "Mis estadisticas", path: "sales" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Container>
        <MenuOpenedButton
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
              style={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                bottom: "20px",
                cursor: "pointer",
              }}
              onClick={() => SignOutUser()}
            >
              <LogoutOutlined
                style={{ fontSize: "16px", color: "white" }}
                className="icon_link"
              />
              <p className="nav_link label">Cerrar sesión</p>
            </div>
          </MenuContainer>

          {/* <button
            className="nav_link"
            style={{ position: "absolute", bottom: "20px" }}
          >
            cerrar sesion
          </button> */}
        </SideMenu>
      </Container>

      <MainWrapper menustatus={menustatus}>
        <Outlet />
      </MainWrapper>
    </div>
  );
};

export default DashboardPage;
