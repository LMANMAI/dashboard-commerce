import styled from "styled-components";

export const SideMenu = styled.div`
  border: 1px solid red;
  height: 100vh;
  min-width: 100px;
  display: flex;
  align-items: center;
`;
export const MenuContainer = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
`;
export const MenuItem = styled.li`
  a {
    text-decoration: none;
  }
`;
