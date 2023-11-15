import styled from "styled-components";
import customTheme from "../../../customTheme";
import { Upload } from "antd";

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

export const StockContainer = styled.div`
  margin-bottom: 10px;
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
      border: 1px solid;
      font-size: 12px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      left: -5px;
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
    width: 100%;
    height: 100%;
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
    left: 0px;
    border: none;
    border-radius: 100%;
    height: 15px;
    width: 15px;
    font-size: 10px;
    cursor: pointer;
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
  height: 75vh;
  flex-direction: column;
  p {
    margin: 5px 0px;
    color: #4e7a9c;
  }
`;
