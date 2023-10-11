import styled from "styled-components";
import { Button } from "antd";
import customTheme from "@customTheme";

export const AddFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0px;
  justify-content: space-evenly;
  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (min-width: 1440px) {
  }
  .card__product_add {
    .ant-card-cover.ant-card-cover {
      height: 170px;
      overflow: hidden;
    }
  }
`;
export const AddForm = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  .box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0px 5px;
  }
  // display: flex;
  // flex-wrap: wrap;
  // gap: 20px;
  // padding: 0px 15px;
  // margin: 15px 0px;
  // flex-direction: column;
  // .input__addform {
  //   max-width: 350px;
  // }
  // .precio {
  //   max-width: 150px;
  // }
  // .qty {
  //   max-width: 200px;
  // }
  // .datepicker__addform {
  //   min-width: 175px;
  // }
  // .input__formadd_container {
  //   display: flex;
  //   gap: 10px;
  //   flex-direction: column;
  // }
  // .input__formadd_container_talle {
  //   border: 1px solid #eee;
  //   display: flex;
  //   flex-direction: column;
  //   gap: 10px;
  //   padding: 10px 5px;
  //   align-items: center;
  // }
  // .button__formadd {
  //   display: flex;
  //   flex-direction: column;
  //   gap: 10px;
  // }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    // .input__formadd_container {
    //   width: calc(100vw - 390px);
    // }
    // .input__formadd_container {
    //   flex-direction: row;
    //   flex-wrap: wrap;
    //   align-items: center;
    //   justify-content: space-between;
    // }
    // .button__formadd {
    //   flex-direction: row;
    // }
    // .input__formadd_container_talle {
    //   flex-flow: nowrap;
    //   flex-direction: row;
    // }
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  //   .input__formadd_container_talle {
  //     flex-flow: nowrap;
  //     flex-direction: row;
  //   }
  //   .input__addform {
  //     min-width: 350px;
  //     max-width: 50px;
  //   }
  //   .precio {
  //     min-width: 150px;
  //     max-width: 50px;
  //   }
  //   .qty {
  //     min-width: 200px;
  //     max-width: 50px;
  //   }
  // }
`;
export const AddButonContainer = styled.button`
  align-self: end;
  margin: 0px 15px;
`;

export const StyledCustomButton = styled(Button)`
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  margin: 10px auto;
  background-color: ${customTheme["@action-color"]};
  &:hover {
    background-color: #3e617d !important;
  }
`;
