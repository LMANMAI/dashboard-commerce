import styled from "styled-components";
import { Button } from "antd";
import customTheme from "@customTheme";
export const Title = styled.h3`
  color: white;
  padding: 10px;
  margin: 10px 0px;
  background-color: ${customTheme["@secondary-color"]};
`;
export const StyledCustomButton = styled(Button)`
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  background-color: ${customTheme["@action-color"]};
  justify-content: center;
  &:hover {
    background-color: #3e617d !important;
    color: white !important;
  }
`;
