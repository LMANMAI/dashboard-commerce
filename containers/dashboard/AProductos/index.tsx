import React from "react";
import { AddFormContainer, AddForm, AddButonContainer } from "./styles";
const AgregarProductos = () => {
  return (
    <div>
      <h3
        style={{ color: "white", padding: "10px", margin: "10px 25px" }}
        className="bg-neutral"
      >
        Add products
      </h3>
      <AddFormContainer>
        <AddForm>
          <input
            name="desde"
            type="date"
          />
          <select >
            <option disabled selected>
              Brand
            </option>
            <option>Nike</option>
            <option>Adidas</option>
          </select>
          <input
            type="text"
            placeholder="Name"
          />
          <input
            type="number"
            placeholder="Price"
          />

          <label
            htmlFor=""
            style={{ display: "flex", flexDirection: "column" }}
          >
            Poster image
            <input
              type="file"
            />
          </label>
          <label
            htmlFor=""
            style={{ display: "flex", flexDirection: "column" }}
          >
            Product images
            <input
              type="file"
              multiple={true}
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </label>
        </AddForm>

        <AddButonContainer className="btn btn-neutral">
          save item
        </AddButonContainer>
      </AddFormContainer>
    </div>
  );
};

export default AgregarProductos;
