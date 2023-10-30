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
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 5px;
  }
`;
