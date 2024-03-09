import styled from "styled-components";
import { IMenu } from "@types";
import customTheme from "../../customTheme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${customTheme["@secondary-color"]};
`;
export const MainWrapper = styled.main<IMenu>`
  padding: 0px 5px;
  background: ${customTheme["@primary-color"]};
  overflow-y: auto;
  width: 100%;
`;
export const SideMenu = styled.div<IMenu>`
  height: 100vh;
  transition: width 300ms ease-in-out;
  width: ${(props) => (props.menustatus ? "275" : "50")}px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0px 7px;
  position: relative;
`;
export const MenuOpenedButton = styled.button<IMenu>`
  width: 30px;
  transition: align 500ms ease-in-out;
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
    border-radius: 5px;
    background: ${customTheme["@primary-color"]};
    color: ${customTheme["@secondary-color"]};
    p {
      color: ${customTheme["@secondary-color"]};
    }
  }
  .nav_link {
    text-decoration: none;
    color: ${customTheme["@primary-color"]};
    display: flex;
    align-items: center;
    transition: all 150ms ease-in-out;
    flex-wrap: nowrap;
    justify-content: ${(props) => (props.menustatus ? "start" : "center")};
    &:hover {
      background: ${customTheme["@secondary-color-dark"]};
      p,
      span {
        color: white;
      }
    }
    &.label {
      font-size: 14px;
      transition-delay: 450ms;
      transition: display 350ms ease-in-out;
      display: ${(props) => (props.menustatus ? "inherit" : "none")};
    }
  }
  .icon_link {
    font-size: 20px !important;
    padding: 10px;
    border-radius: 5px;
  }

  .logout__button {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    cursor: pointer;
    &:hover {
      p {
        background-color: ${customTheme["@secondary-color"]};
      }
    }
  }
`;
