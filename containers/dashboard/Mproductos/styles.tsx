import styled from "styled-components";
import customTheme from "../../../customTheme";
import { Upload } from "antd";

export const TaleContainer = styled.div`
  margin: 0px auto;
  th {
    font-size: 13px;
    background-color: ${customTheme["@secondary-color"]}!important;
    color: white !important;
  }
`;
export const MisProductosContainer = styled.div`
  max-width: 90%;
  margin: 0px auto;
  .misproductos__box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    .misproductos__box__button {
      width: 100%;
      border-radius: 5px;
      padding: 10px 0px;
      cursor: pointer;
      background-color: ${customTheme["@secondary-color-dark"]};
      color: white;
      height: 30px;
      font-size: 13px;
      display: flex;
      align-items: center;
      p {
        padding: 0px 10px;
      }
      transition: all 250ms ease-in-out;
      &:hover {
        background-color: ${customTheme["@secondary-color"]};
      }
    }
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
      flex-direction: row;
      gap: 10px;
      align-items: center;
      justify-content: start;
      height: 100px;
      border-radius: 5px;
      margin: 15px 0px;
      margin-bottom: 0px;
    }
    .misproductos__box__button {
      max-width: 450px;
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
export const StockContainer = styled.div`
  .badge__container {
    .button_badge {
      position: relative;
      &:hover {
        .button__delete_badge {
          visibility: visible;
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
      border: 1px solid white;
      font-size: 10px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      left: -5px;
      line-height: 5px;
      background-color: #944646;
      color: white;
      z-index: 99;
    }
  }

  .input__formadd_container_talle {
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin: 0px auto;
    width: 100%;
    margin-top: 20px;
    .ant-select {
      width: 100% !important;
    }
  }
`;
export const EditMode = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  margin: 10px 0px;
`;
export const EditPanel = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
`;
export const InfoPanel = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    height: 30px;
  }
`;
export const DetailImgContainer = styled.div`
  display: flex;
  gap: 10px;
`;
export const DetailImgPosterPath = styled.div`
height: 300px;
width: 300px;
}
img{
  width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 5px;
}`;
export const DetailImgDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .img_detail {
    height: 50px;
    width: 50px;
    position: relative;
  }
  img {
    height: 50px;
    width: 50px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 5px;
  }
  .upload-list-inline {
    .ant-upload-list .ant-upload-list-picture-card {
      .ant-upload .ant-upload {
        height: 50px !important;
        width: 50px !important;
      }
    }
    height: 50px !important;
    width: 50px !important;
  }

  .button__delete_badge {
    position: absolute;
    bottom: 0px;
    left: -5px;
    bottom: -5px;
    border: none;
    border-radius: 100%;
    height: 15px;
    width: 15px;
    font-size: 10px;
    cursor: pointer;
    background: #e1e1e1;
    line-height: 10px;
  }
`;
export const StyledUpload = styled(Upload)`
  div.ant-upload.ant-upload-select {
    width: 50px !important;
    height: 50px !important;
  }
  div.ant-upload-list-item.ant-upload-list-item-done {
    width: 50px !important;
    height: 50px !important;
  }
  div.ant-upload-list-item-container {
    width: 50px !important;
    height: 50px !important;
  }
  span.ant-upload {
    width: 50px !important;
    height: 50px !important;
  }
`;
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 250px;
  p {
    margin: 5px 0px;
    color: #4e7a9c;
  }
`;
export const ModalAddPromotionsContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  .input__discount {
    margin: 5px 0px;
    width: 250px;
  }

  .input__discount_container,
  .select__discount_container {
    display: flex;
    flex-direction: row;
    gap: 5px;
    width: 100%;
    justify-content: space-evenly;
    .input__discount {
      margin: 0px !important;
    }
  }

  @media (min-width: 568px) {
    & {
      flex-direction: row;
    }

    .select__discount_container {
      width: 100%;
    }
    .input__discount_container {
      width: 50%;
    }
  }

  @media (max-width: 768px) {
    .input__discount_container,
    .select__discount_container {
      flex-direction: column;
    }
    .select__discount,
    .input__discount {
      width: 100% !important;
    }

    .select__discount .select__mproducts {
      width: 100% !important;
    }
  }
`;
export const ModalCurrentPromotion = styled.div`
  .current_promotion {
    display: flex;
    gap: 10px;
    padding: 10px;
    flex-wrap: wrap;
    max-height: 50dvh;
    overflow-y: auto;
    p {
      font-size: 13px;
    }
  }
`;
