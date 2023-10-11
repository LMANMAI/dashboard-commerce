import React, { useState } from "react";
import { AddFormContainer, AddForm, StyledCustomButton } from "./styles";
import { Title } from "../styles";
import { UploadOutlined } from "@ant-design/icons";
import type { DatePickerProps, UploadProps } from "antd";
import { Input, DatePicker, Select, Button, message, Upload, Card } from "antd";
import { SaveOutlined } from "@ant-design/icons";
const { Meta } = Card;
const AgregarProductos = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Title>Agregar productos al inventario</Title>
      <AddFormContainer>
        <AddForm>
          <div className="input__formadd_container">
            <Input
              className="input__addform"
              placeholder="Nombre"
              type="text"
            />
            <Input
              className="input__addform"
              placeholder="Precio"
              type="number"
            />
            <DatePicker className="datepicker__addform" onChange={onChange} />
            <Select
              defaultValue="Elige una marca"
              onChange={handleChange}
              style={{ width: 250 }}
              options={[
                { value: "jack", label: "Elige una marca" },
                { value: "jack", label: "Nike" },
                { value: "lucy", label: "Adidas" },
                { value: "Yiminghe", label: "Vans" },
                { value: "disabled", label: "Converse" },
              ]}
            />
            <Select
              defaultValue="Genero"
              onChange={handleChange}
              style={{ width: 250 }}
              options={[
                { value: "jack", label: "Elige un genero" },
                { value: "jack", label: "Hombre" },
                { value: "lucy", label: "Mujer" },
                { value: "lucy", label: "Unisex" },
              ]}
            />
            <div className="input__formadd_container_talle">
              <Input
                className="input__addform"
                placeholder="Cantidad"
                type="number"
              />
              <Select
                defaultValue="Tamaño"
                onChange={handleChange}
                style={{ width: 250 }}
                options={[
                  { value: "jack", label: "Elige un Tamaño" },
                  { value: "jack", label: "9" },
                  { value: "lucy", label: "9.5" },
                  { value: "lucy", label: "10" },
                ]}
              />
              <StyledCustomButton type="primary" icon={<SaveOutlined />}>
                Guardar producto con este talle
              </StyledCustomButton>
            </div>
          </div>

          <div className="button__formadd">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>
                Imagen de portada del producto
              </Button>
            </Upload>

            <Upload {...props}>
              <Button icon={<UploadOutlined />}>
                Imagenes extra del producto
              </Button>
            </Upload>
          </div>
        </AddForm>
        <Card
          hoverable
          className="card__product_add"
          style={{ width: 275, height: 300 }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
          <StyledCustomButton type="primary" icon={<SaveOutlined />}>
            Guardar producto
          </StyledCustomButton>
        </Card>
      </AddFormContainer>
    </div>
  );
};

export default AgregarProductos;
