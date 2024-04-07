import styled from "styled-components";
import customTheme from "../../../customTheme";
export const GraphicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 10px;
  justify-content: center;
  .chart_container {
    display: flex;
    flex-direction: column;
  }
  .graphic {
    max-width: 35dvw;
    min-width: 300px;
  }
  @media (max-width: 768px) {
    .graphic {
      max-width: 450px;
      min-width: 45dvw;
    }
  }
  @media (min-width: 1024px) {
    .chart_container {
      flex-direction: row;
    }
  }
`;

export const HeaderTittle = styled.h3`
  padding: 10px;
  text-align: center;
  background-color: ${customTheme["@action-color"]};
  color: white;
  margin: 15px auto;
  width: 50%;
  max-width: 700px;
  min-width: 45dvw;
`;
