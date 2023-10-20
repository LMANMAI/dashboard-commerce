import styled from "styled-components";
import { Steps, Input, Button } from "antd";
import customTheme from "@customTheme";
export const AddFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 35px;
  justify-content: space-evenly;

  .steps {
    width: 100%;
    margin: 0px auto;
    max-width: 1200px;
  }
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
  display: flex;
  flex-direction: column;
  gap: 15px;
  .select__formcontain {
    display: flex;
    justify-content: start;
    flex-direction: column;
    gap: 15px;
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .select__formcontain {
      flex-direction: row;
    }
  }
`;
export const AddButonContainer = styled.button`
  align-self: end;
  margin: 0px 15px;
`;

export const StepsContainer = styled.section`
  margin-top: 20px;
  padding: 10px 20px;
  min-height: 300px;
  .button__formadd {
    display: flex;
    flex-direction: column;
    gap: 15px;
    button {
      min-width: 260px;
    }
  }
  .input__formadd_container_talle {
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin: 0px auto;
  }

  @media (min-width: 1024px) {
    .button__formadd {
      flex-direction: row;
    }
    .input__formadd_container_talle {
      flex-direction: row;
      //width: 50%;
    }
  }
`;

export const CustomSteps = styled(Steps)`
  && {
    .ant-steps-item.ant-steps-item-process.ant-steps-item-active {
      .ant-steps-item-icon {
        border-color: ${customTheme["@action-color"]}!important;
        background-color: ${customTheme["@action-color"]}!important;
      }
    }
    .ant-steps-item.ant-steps-item-finish {
      .ant-steps-item-icon {
        background-color: ${customTheme["@action-color-transparent"]}!important;

        .ant-steps-icon {
          color: ${customTheme["@primary-color"]}!important;
        }
      }
    }
    .ant-steps-item-tail {
      &:after {
        background-color: ${customTheme["@action-color"]}!important;
      }
    }
  }
`;

export const CustomInput = styled(Input)`
  && {
    input {
      &:focus {
        border: 1px solid ${customTheme["@action-color"]}!important;
      }
    }
  }
`;
