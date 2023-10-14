import React, { useState } from "react";
import { AddFormContainer, AddForm, StepsContainer } from "./styles";
import { UploadOutlined } from "@ant-design/icons";
import type { DatePickerProps, UploadProps } from "antd";
import {
  Input,
  DatePicker,
  Select,
  Button,
  message,
  Upload,
  Card,
  Steps,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
const { Meta } = Card;

const AgregarProductos = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState(0);

  const onFinish = () => {};
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const StepOne = () => {
    return (
      <AddForm>
        <Input
          addonBefore="Nombre"
          className="input__addform"
          placeholder="Nombre"
          type="text"
        />
        <Input
          addonBefore="Precio"
          className="input__addform precio"
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
      </AddForm>
    );
  };

  const StepTwo = () => {
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
          message.success(`${info.file.name} se cargo correctamente`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} no se pudo cargar correctamente.`);
        }
      },
    };

    return (
      <div className="button__formadd">
        <Upload {...props}>
          <Button
            title="Imagen con la que se promociona el producto"
            icon={<UploadOutlined />}
          >
            Imagen para la portada
          </Button>
        </Upload>

        <Upload {...props}>
          <Button
            title="Imagenes complementarias del producto"
            icon={<UploadOutlined />}
          >
            Imagenes del producto
          </Button>
        </Upload>
      </div>
    );
  };
  const StepThree = () => {
    return (
      <div className="input__formadd_container_talle">
        <Input
          className="input__addform qty"
          placeholder="Cantidad"
          type="number"
          addonBefore="Cantidad"
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
        <Button type="default" icon={<SaveOutlined />}>
          Guardar
        </Button>
      </div>
    );
  };
  const LastStep = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
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
        </Card>
      </div>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <AddFormContainer>
        <div className="steps">
          <Steps current={currentStep}>
            <Step title="informacion del producto" />
            <Step title="Cargar imagenes" />
            <Step title="Cargar stock" />
            <Step title="Guardar producto" />
          </Steps>
          <StepsContainer>
            {currentStep === 0 && <StepOne />}
            {currentStep === 1 && <StepTwo />}
            {currentStep === 2 && <StepThree />}
            {currentStep === 3 && <LastStep />}
          </StepsContainer>
          <div style={{ marginTop: "20px" }}>
            {currentStep > 0 && (
              <Button
                type="primary"
                onClick={() => setCurrentStep(currentStep - 1)}
                style={{ marginRight: "10px" }}
              >
                Anterior
              </Button>
            )}
            {currentStep < 3 && (
              <Button
                type="primary"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Siguiente
              </Button>
            )}
            {currentStep === 3 && (
              <Button type="primary" onClick={() => onFinish()}>
                Guardar
              </Button>
            )}
          </div>
        </div>
      </AddFormContainer>
    </div>
  );
};

export default AgregarProductos;
