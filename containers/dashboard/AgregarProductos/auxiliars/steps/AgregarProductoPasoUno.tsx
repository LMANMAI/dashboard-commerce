import React, { useContext } from "react";
import { SaveOutlined } from "@ant-design/icons";
import { AddForm, CustomInput } from "../../styles";
import { DatePicker, Select, Button, Space, Badge, Avatar } from "antd";
import {
  SelectMockDataSize,
  SelectMockDataGenre,
  SelectMockDataBrand,
} from "../../../Mproductos/statics";

import { FunctionsAgregarContext } from "../../../../../context/functionsAgregrarProductosContext";
import dayjs from "dayjs";

const AgregarProductoPasoUno: React.FC = () => {
  const {
    product,
    inputValue,
    handleChange,
    setProduct,
    handleDeleteStock,
    handleChangeSizeStock,
    handleSizeInputChange,
    handleSaveStock,
  } = useContext(FunctionsAgregarContext);

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
            setProduct({
              ...product,
              releaseYear: date,
            });
          }
        }}
        defaultValue={dayjs()}
        value={product.relaseYear}
        format={"DD/MM/YY"}
      />
      <div className="select__formcontain">
        <Select
          onChange={(value) => handleChange("brand", value)}
          style={{ width: 250 }}
          value={product.brand}
          options={SelectMockDataBrand}
        />
        <Select
          onChange={(value) => handleChange("genre", value)}
          style={{ width: 250 }}
          value={product.genre}
          options={SelectMockDataGenre}
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
          options={SelectMockDataSize}
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
        <Space size="middle">
          {product.sizes.map((item: any, index: number) => (
            <div className="button_badge" key={index}>
              <button
                className="button__delete_badge"
                onClick={() => handleDeleteStock(index)}
                title="Eliminar producto del stock"
              >
                x
              </button>
              <Badge size="small" count={item.qty} color={"#4E7A9C"}>
                <Avatar shape="square" size="small">
                  {item.size}
                </Avatar>
              </Badge>
            </div>
          ))}
        </Space>
      </div>
    </AddForm>
  );
};

export default AgregarProductoPasoUno;
