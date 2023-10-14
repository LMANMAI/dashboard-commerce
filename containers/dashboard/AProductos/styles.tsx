import styled from "styled-components";

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
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export const AddButonContainer = styled.button`
  align-self: end;
  margin: 0px 15px;
`;

export const StepsContainer = styled.section`
  margin-top: 20px;
  max-width: 800px;
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
