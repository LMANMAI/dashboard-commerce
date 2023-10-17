import React, { useState, useRef } from "react";
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
interface InputRef {
  input: HTMLInputElement | null;
}

const AgregarProductos = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFileList] = useState<any>();
  const [imgs1, setImgsList1] = useState<any>();
  const [imgs2, setImgsList2] = useState<any>();
  const [imgs3, setImgsList3] = useState<any>();
  const [product, setProduct] = useState({
    sizes: [] as { size: string; qty: string }[],
    name: "",
    relaseYear: "2021-04-15",
    price: 0,
    brand: "",
    genre: "",
    quantity: 0,
  });
  const [inputValue, setInputValue] = useState<string>("");
  const [sizevalue, setSizevalue] = useState<string>("");

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
  const handleSaveStock = () => {
    const newSize = {
      size: sizevalue,
      qty: inputValue,
    };
    const prevStock: { size: string; qty: string }[] = product.sizes;
    setProduct({
      ...product,
      sizes: [...prevStock, newSize],
    });

    setSizevalue("");
    setInputValue("");
    console.log(product);
  };
  const handleChangeSizeStock = (value: string) => {
    setSizevalue(value);
  };
  const handleSizeInputChange = (e: any) => {
    const { value } = e.target;
    setInputValue(value);
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
          <Steps size="small" current={currentStep} labelPlacement="vertical">
            <Step title="información" />
            <Step title="Imagenes" />
            {/* <Step  title="Cargar stock" /> */}
            <Step title="Guardar" />
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
                <div className="select__formcontain">
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
                </div>

                <div className="input__formadd_container_talle">
                  <Input
                    className="input__addform qty"
                    placeholder="Cantidad"
                    value={inputValue}
                    type="text"
                    addonBefore="Cantidad"
                    onChange={handleSizeInputChange}
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
              </AddForm>
            )}
            {currentStep === 1 && <StepTwo />}
            {currentStep === 2 && <LastStep />}
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
            {currentStep < 2 && (
              <Button
                type="primary"
                onClick={() => {
                  setCurrentStep(currentStep + 1);
                }}
              >
                Siguiente
              </Button>
            )}
            {currentStep === 2 && (
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
