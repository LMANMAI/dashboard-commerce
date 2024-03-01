import React from "react";
import { Button } from "antd";

interface Props {
  product: any;
  handleInputChange: (fieldName: string, value: any) => void;
  handleNextStep: () => void;
}

const AgregarProductoPasoUno: React.FC<Props> = ({
  product,
  handleInputChange,
  handleNextStep,
}) => {
  return (
    <AddForm>
      <CustomInput
        addonBefore="Nombre"
        className="input__addform"
        placeholder="Nombre"
        type="text"
        name="name"
        value={product.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <CustomInput
        addonBefore="Precio"
        className="input__addform precio"
        placeholder="Precio"
        type="number"
        name="price"
        value={product.price}
        onChange={(e) => handleChange("price", e.target.value)}
      />
      <DatePicker
        className="datepicker__addform"
        onChange={(date) => {
          if (date) {
            const formattedDate = date.format("YYYY-MM-DD");
            setProduct({
              ...product,
              relaseYear: formattedDate,
            });
          }
        }}
        value={dayjs(product.relaseYear)}
        format={"DD/MM/YY"}
      />
      <div className="select__formcontain">
        <Select
          onChange={(value) => handleChange("brand", value)}
          style={{ width: 250 }}
          value={product.brand}
          options={[
            { label: "Elige una marca", value: "" },
            { label: "Adidas", value: "ADIDAS" },
            { label: "Nike", value: "NIKE" },
            { label: "New Balance", value: "NEW BALANCE" },
            { label: "Air Jordan", value: "AIR JORDAN" },
            { label: "Yeezy", value: "YEEZY" },
            { label: "Converse", value: "CONVERSE" },
            { label: "Vans", value: "VANS" },
            { label: "Revengexstorm", value: "REVENGEXSTORM" },
          ]}
        />
        <Select
          onChange={(value) => handleChange("genre", value)}
          style={{ width: 250 }}
          value={product.genre}
          options={[
            { value: "", label: "Elige un genero" },
            { value: "MEN", label: "Hombre" },
            { value: "WOMAN", label: "Mujer" },
            { value: "UNISEX", label: "Unisex" },
          ]}
        />
      </div>

      <div className="input__formadd_container_talle">
        <CustomInput
          className="input__addform qty"
          placeholder="Cantidad"
          value={inputValue}
          type="number"
          addonBefore="Cantidad"
          onChange={(e) => handleSizeInputChange(e.target.value)}
        />
        <Select
          defaultValue="Tamaño"
          onChange={handleChangeSizeStock}
          style={{ width: 250 }}
          options={[
            { value: "", label: "Elige un Tamaño" },
            { value: "5", label: "5" },
            { value: "5.5", label: "5.5" },
            { value: "6", label: "6" },
            { value: "6.5", label: "6.5" },
            { value: "7", label: "7" },
            { value: "7.5", label: "7.5" },
            { value: "8", label: "8" },
            { value: "8.5", label: "8.5" },
            { value: "9", label: "9" },
            { value: "9.5", label: "9.5" },
            { value: "10", label: "10" },
            { value: "10.5", label: "10.5" },
            { value: "11", label: "11" },
            { value: "11.5", label: "11.5" },
            { value: "12", label: "12" },
          ]}
        />
        <Button
          onClick={() => handleSaveStock()}
          type="default"
          icon={<SaveOutlined />}
        >
          Guardar
        </Button>
      </div>
      <div className="badge__container">
        {product.sizes.map((item: any, index: any) => (
          <div className="button_badge" key={index}>
            <button
              className="button__delete_badge"
              onClick={() => handleDeleteStock(index)}
              title="Eliminar producto del stock"
            >
              x
            </button>
            <span>{item.qty}</span>
            <span>{item.size}</span>
          </div>
        ))}
      </div>
    </AddForm>
  );
};

export default AgregarProductoPasoUno;
