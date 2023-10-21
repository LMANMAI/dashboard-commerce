import React, { useState } from "react";
import {
  AddFormContainer,
  AddForm,
  StepsContainer,
  CustomSteps,
  CustomInput,
} from "./styles";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import {
  DatePicker,
  Select,
  Button,
  Upload,
  Card,
  Steps,
  notification,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { StyledCustomButton } from "../styles";
import axios from "axios";
import dayjs from "dayjs";

const key = "updatable";
const AgregarProductos = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFileList] = useState<any>();
  const [imgs1, setImgsList1] = useState<any>([]);
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

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (message: string, description: string) => {
    api.open({
      key,
      message: message,
      description: description,
    });

    setTimeout(() => {
      api.destroy();
    }, 3000);
  };

  const onFinish = async () => {
    const formData = new FormData();
    formData.append("image", file.originFileObj);
    formData.append("sneaker", JSON.stringify(product));
    await axios
      .post(`${import.meta.env.VITE_URL_EP}sneaker/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          const imagesFormData = new FormData();
          imagesFormData.append("images", imgs1[0]?.originFileObj);
          imagesFormData.append("images", imgs1[1]?.originFileObj);
          imagesFormData.append("images", imgs1[2]?.originFileObj);
          await axios
            .put(
              `${import.meta.env.VITE_URL_EP}sneaker/productimages/${
                response.data.sneaker._id
              }`,
              imagesFormData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then(() => {
              // setCurrentStep(0);
              // setFileList(null);
              // setProduct({
              //   sizes: [],
              //   name: "",
              //   relaseYear: "2021-04-15",
              //   price: 0,
              //   brand: "",
              //   genre: "",
              //   quantity: 0,
              // });
              openNotification(
                "Producto agregado correctamente",
                "Se agrego el producto correctamente, lo vera reflejado en el menu de mis productos."
              );
            });
        } else {
          openNotification(
            "Ocurrio un error al agregar el producto",
            "Por favor vuelva a intentar en unos momentos."
          );
        }
      })
      .catch((error) => {
        openNotification(
          error.message,
          "Ocurrio un error, por favor contacte al proveedor de datos."
        );
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
        if (info.file.status === "uploading") {
          setFileList(info.file);
        } else if (info.file.status === "error") {
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
        if (info.file.status === "uploading") {
          console.log(info.fileList);
          setImgsList1(info.fileList);
        } else if (info.file.status === "error") {
        }
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

        <Upload multiple={true} {...props1}>
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

  const LastStep = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          className="card__product_add"
          style={{ width: 275 }}
          cover={<img alt="example" src={file.thumbUrl} />}
          title={product.name}
        >
          <p>Precio: ${product.price}</p>
          <p>Marca: {product.brand}</p>
          <p>Genero: {product.genre}</p>
          {/* <p>Stock: {product.qty}</p> */}
        </Card>
      </div>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      {contextHolder}
      <AddFormContainer>
        <div className="steps">
          <CustomSteps
            size="small"
            current={currentStep}
            labelPlacement="vertical"
          >
            <Step title="información" />
            <Step title="Imagenes" />
            <Step title="Guardar" />
          </CustomSteps>
          <StepsContainer>
            {currentStep === 0 && (
              <AddForm>
                <CustomInput
                  addonBefore="Nombre"
                  className="input__addform"
                  placeholder="Nombre"
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                />
                <CustomInput
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
                  <CustomInput
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

          <div style={{ marginTop: "20px", display: "flex" }}>
            {currentStep > 0 && (
              <StyledCustomButton
                type="primary"
                onClick={() => setCurrentStep(currentStep - 1)}
                style={{ marginRight: "10px" }}
              >
                Anterior
              </StyledCustomButton>
            )}
            {currentStep < 2 && (
              <StyledCustomButton
                type="primary"
                onClick={() => {
                  setCurrentStep(currentStep + 1);
                }}
                disabled={
                  (currentStep === 0 &&
                    (product.name === "" ||
                      product.genre === "" ||
                      product.brand === "")) ||
                  (currentStep === 1 && !file)
                }
              >
                Siguiente
              </StyledCustomButton>
            )}
            {currentStep === 2 && (
              <StyledCustomButton type="primary" onClick={() => onFinish()}>
                Guardar
              </StyledCustomButton>
            )}
          </div>
        </div>
      </AddFormContainer>
    </div>
  );
};

export default AgregarProductos;
