import React, { useState } from "react";
import { AddFormContainer, AddForm, StepsContainer } from "./styles";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
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
import axios from "axios";
const { Meta } = Card;
import dayjs from "dayjs";

const AgregarProductos = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFileList] = useState<any>();
  const [imgs1, setImgsList1] = useState<any>();
  const [imgs2, setImgsList2] = useState<any>();
  const [imgs3, setImgsList3] = useState<any>();
  const [product, setProduct] = useState({
    sizes: [],
    name: "",
    relaseYear: "2021-04-15",
    price: 0,
    brand: "",
    genre: "",
    quantity: 0,
  });

  const onFinish = async () => {
    const formData = new FormData();
    formData.append("image", file.originFileObj);
    formData.append("sneaker", JSON.stringify(product));
    axios
      .post(`${import.meta.env.VITE_URL_EP}/sneaker/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Manejar la respuesta
        console.log(imgs1, imgs2, imgs3);
        const formDataImages = new FormData();
        formDataImages.append("images", imgs1.originFileObj);
        formDataImages.append("images", imgs2.originFileObj);
        formDataImages.append("images", imgs3.originFileObj);

        axios
          .put(
            `${import.meta.env.VITE_URL_EP}/sneaker/productimages/${
              response.data.sneaker._id
            }`,
            formDataImages,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => console.log(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (date: any) => {
    if (date) {
      const dayjsDate = dayjs(date.toDate());
      const formattedDate = dayjsDate.format("YYYY-MM-DD");
      setProduct({
        ...product,
        relaseYear: formattedDate,
      });
    }
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleGenreChange = (value: any) => {
    setProduct({ ...product, genre: value });
  };
  const handleBrandChange = (value: any) => {
    setProduct({ ...product, brand: value });
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const StepTwo = () => {
    const propsPosterPath: UploadProps = {
      name: "file",
      action: "http://localhost:5173/add",
      headers: {
        authorization: "authorization-text",
      },

      onChange(info) {
        console.log(info.file);
        if (info.file.status === "uploading") {
          setFileList(info.file);
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const props1: UploadProps = {
      name: "images",
      action: "http://localhost:5173/add",
      headers: {
        authorization: "authorization-text",
      },
      onChange(info) {
        // console.log(info.file);
        if (info.file.status === "uploading") {
          setImgsList1(info.file);
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
        console.log(info.file.name);
      },
    };
    const props2: UploadProps = {
      name: "images",
      action: "http://localhost:5173/add",
      headers: {
        authorization: "authorization-text",
      },
      onChange(info) {
        // console.log(info.file);
        if (info.file.status === "done") {
          setImgsList2(info.file);
          message.success(`${info.file.name} file uploaded successfully`);
        }
        if (info.file.status === "uploading") {
          setImgsList2(info.file);
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
        console.log(info.file.name);
      },
    };
    const props3: UploadProps = {
      name: "images",
      action: "http://localhost:5173/add",
      headers: {
        authorization: "authorization-text",
      },
      onChange(info) {
        // console.log(info.file);
        if (info.file.status === "uploading") {
          setImgsList3(info.file);
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
        console.log(info.file.name);
      },
    };

    return (
      <div className="button__formadd">
        <Upload
          listType="picture"
          className="upload-list-inline"
          {...propsPosterPath}
        >
          <Button
            title="Imagen con la que se promociona el producto"
            icon={<UploadOutlined />}
          >
            Imagen para la portada
          </Button>
          <p>{file?.name}</p>
        </Upload>

        <div>
          <Upload multiple={true} {...props1}>
            <Button
              title="Imagenes complementarias del producto"
              icon={<UploadOutlined />}
            >
              Imagenes del producto
            </Button>
          </Upload>
          <Upload multiple={true} {...props2}>
            <Button
              title="Imagenes complementarias del producto"
              icon={<UploadOutlined />}
            >
              Imagenes del producto
            </Button>
          </Upload>
          <Upload multiple={true} {...props3}>
            <Button
              title="Imagenes complementarias del producto"
              icon={<UploadOutlined />}
            >
              Imagenes del producto
            </Button>
          </Upload>
        </div>
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
            {currentStep === 0 && (
              <AddForm>
                <Input
                  addonBefore="Nombre"
                  className="input__addform"
                  placeholder="Nombre"
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                />
                <Input
                  addonBefore="Precio"
                  className="input__addform precio"
                  placeholder="Precio"
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                />

                <DatePicker
                  className="datepicker__addform"
                  onChange={onChange}
                  value={dayjs(product.relaseYear, "YYYY-MM-DD")}
                  format={"DD/MM/YY"}
                />
                <Select
                  onChange={handleBrandChange}
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
                  onChange={handleGenreChange}
                  style={{ width: 250 }}
                  value={product.genre}
                  options={[
                    { value: "", label: "Elige un genero" },
                    { value: "MEN", label: "Hombre" },
                    { value: "WOMAN", label: "Mujer" },
                    { value: "UNISEX", label: "Unisex" },
                  ]}
                />
              </AddForm>
            )}
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
                onClick={() => {
                  setCurrentStep(currentStep + 1);
                }}
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
