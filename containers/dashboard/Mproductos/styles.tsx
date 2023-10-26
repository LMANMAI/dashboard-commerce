import styled from "styled-components";
import customTheme from "@customTheme";

export const TaleContainer = styled.div`
  margin: 0px auto;
  th {
    background-color: ${customTheme["@secondary-color"]}!important;
    color: white !important;
  }
`;

export const MisProductosContainer = styled.div`
  max-width: 90%;
  margin: 0px auto;
  .misproductos__box {
    display: none;
  }
  .misproductos__formulario {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px 0px;
  }
  .select__mproducts {
    width: 100%;
  }
  @media (min-width: 768px) {
    .misproductos__box {
      display: block;
      height: 100px;
      border: 1px solid #eee;
      border-radius: 5px;
      margin: 15px 0px;
      margin-bottom: 0px;
    }

    .misproductos__formulario {
      flex-direction: row;
    }

    .select__mproducts {
      width: 100%;
      max-width: 350px;
    }
  }
`;
