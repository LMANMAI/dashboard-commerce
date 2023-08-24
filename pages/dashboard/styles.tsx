import styled from "styled-components";
import { IMenu } from "@types";
export const SideMenu = styled.div<IMenu>`
  height: 100vh;
  transition: width 300ms ease-in-out;
  width: ${(props) => (props.menustatus ? "150" : "70")}px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0px 5px;
`;
export const MenuOpenedButton = styled.button<IMenu>`
  width: 30px;
  transition: all 300ms ease-in-out;
  align-self: ${(props) => (props.menustatus ? "end" : "center")};
  margin: 5px 0px;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
`;
export const MenuContainer = styled.ul<IMenu>`
  list-style: none;
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  .nav_link {
    text-decoration: none;
    color: #3b3c3d;
    display: flex;
    align-items: center;
    padding: 5px 8px;
    transition: all 300ms ease-in-out;
    flex-wrap: nowrap;
    justify-content: ${(props) => (props.menustatus ? "start" : "center")};
    .icon_link {
      font-size: 20px !important;
    }
    &.label {
      font-size: 14px;
      transition-delay: 450ms;
      transition: display 350ms ease-in-out;
      display: ${(props) => (props.menustatus ? "inherit" : "none")};
    }
  }
`;
