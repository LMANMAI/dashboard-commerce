import styled from "styled-components";
import customTheme from "../../customTheme";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
`;

export const Card = styled.div`
  width: fit-content;
  min-width: 350px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fafafa;
  box-shadow: 2px 10px 24px -12px rgba(0, 0, 0, 0.75);
  h3 {
    margin: 10px 0px;
    text-align: center;
  }
  .form__input {
    margin: 7px 0px;

    input {
      width: 100%;
      padding: 5px 2px;
      border: 1px solid #ccc;
      background: transparent;
      outline: none;
      padding-left: 10px;
    }
  }

  .form__input_button {
    display: flex;
    justify-content: center;
    button {
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      color: white;
      border-radius: 5px;
      background-color: ${customTheme["@action-color"]};
      &:hover {
        background-color: #265273 !important;
        color: #fff !important;
      }
    }
  }
`;
