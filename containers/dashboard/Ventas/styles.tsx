import styled from "styled-components";

export const GraphicContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;

  .graphic {
    max-width: 35dvw;
    min-width: 300px;
  }
  @media (max-width: 768px) {
    flex-direction: column;

    .graphic {
      max-width: 75dvw;
      min-width: 700px;
    }
  }
`;
