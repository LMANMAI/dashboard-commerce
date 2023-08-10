import React from "react";
import {AddFormContainer, AddForm, AddButonContainer} from './styles'
const AgregarProductos = () => {
  return (
    <AddFormContainer>
      
      <AddForm >
        <input
          name="desde"
          type="date"
          className="date_picker input input-bordered w-full max-w-xs"
         
          // onChange={e => {
          //   if (e.target.value === '') {
          //     delete object[objectnameStart];
          //     return;
          //   }
          //   handleChange({
          //     ...object,
          //     [objectnameStart]: new Date(e.target.value).toISOString(),
          //   });
          // }}
        />

        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Price"
          className="input input-bordered w-full max-w-xs"
        />
      
      
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            Brand
          </option>
          <option>Nike</option>
          <option>Adidas</option>
        </select>


        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />
      </AddForm>

      <AddButonContainer className="btn btn-neutral">save item</AddButonContainer>
    </AddFormContainer>
  );
};

export default AgregarProductos;
