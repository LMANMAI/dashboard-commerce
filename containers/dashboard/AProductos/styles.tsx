import styled from "styled-components";

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
 
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
   
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  
`;
export const AddButonContainer = styled.button`
  align-self: end;
  margin: 0px 15px;
`;
