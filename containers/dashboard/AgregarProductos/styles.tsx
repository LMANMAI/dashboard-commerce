import styled from "styled-components";
import { Steps, Input, Button } from "antd";
import customTheme from "../../../customTheme";
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
    .ant-select {
      width: 100% !important;
    }
  }
  .badge__container {
    .button_badge {
      position: relative;
      &:hover {
        .button__delete_badge {
          visibility: visible;
          z-index: 99;
        }
      }
    }
    .button__delete_badge {
      visibility: hidden;
      position: absolute;
      bottom: -12px;
      border-radius: 100%;
      outline: none;
      height: 15px;
      width: 15px;
      border: 1px solid;
      font-size: 12px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      left: -5px;
    }
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 50%);
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
    .img_name_upload {
      border: 1px solid #eee;
      margin: 5px 0px;
      padding: 5px;
      text-align: start;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      &:hover {
        .img__delete_btn.img__delete_btn {
          visibility: visible;
        }
      }
      .img__delete_btn.img__delete_btn {
        min-width: 20px !important;
        visibility: hidden;
        cursor: pointer;
        border: none;
        color: white;
        background-color: #4e7a9c;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .input__formadd_container_talle {
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin: 0px auto;
    width: 100%;
    .ant-select {
      width: 100% !important;
    }
  }

  @media (min-width: 1024px) {
    .button__formadd {
      flex-direction: row;
    }
    .input__formadd_container_talle {
      flex-direction: row;
    }
  }
`;

export const CustomSteps = styled(Steps)`
  width: 50%;
  margin: 0px auto;
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

export const CustomButton = styled(Button)`
  && {
    &:disabled {
      cursor: not-allowed !important;
      background-color: #cccccc !important;
      color: #666666 !important;
    }
    input {
      &:focus {
        border: 1px solid ${customTheme["@action-color"]}!important;
      }
    }
  }
`;
