import styled from "styled-components";
import { IMenu } from "@types";
export const SideMenu = styled.div<IMenu>`
  height: 100vh;
  transition: width 300ms ease-in-out;
  width: ${(props) => (props.menustatus ? "175" : "70")}px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0px 7px;
`;
export const MenuOpenedButton = styled.button<IMenu>`
  width: 30px;
  transition: all 300ms ease-in-out;
  align-self: ${(props) => (props.menustatus ? "end" : "center")};
  margin: 5px;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  margin-top: 20px;
`;
export const MenuContainer = styled.ul<IMenu>`
  list-style: none;
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  .nav_link.active {
    p {
      color: #00668c;
    }
    color: #00668c;
  }
  .nav_link {
    text-decoration: none;
    color: #3b3c3d;
    display: flex;
    align-items: center;
    padding: 5px 8px;
    transition: all 300ms ease-in-out;
    flex-wrap: nowrap;
    justify-content: ${(props) => (props.menustatus ? "start" : "center")};

    &:hover {
      color: #00668c;
    }
    .icon_link {
      font-size: 20px !important;
      padding: 10px;
      border-radius: 5px;
      background: #f5f4f1M;
    }
    &.label {
      font-size: 14px;
      transition-delay: 450ms;
      transition: display 350ms ease-in-out;
      display: ${(props) => (props.menustatus ? "inherit" : "none")};
    }
  }
`;
