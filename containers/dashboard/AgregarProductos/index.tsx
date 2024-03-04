import React, { useState } from "react";
import { SaveOutlined } from "@ant-design/icons";
import {
  AddFormContainer,
  AddForm,
  StepsContainer,
  CustomSteps,
  CustomInput,
} from "./styles";
import { StyledCustomButton } from "../styles";
import {
  DatePicker,
  Select,
  Button,
  notification,
  Steps,
  Space,
  Badge,
  Avatar,
} from "antd";
import AgregarProductoPasoDos from "./AgregarProductoPasoDos";
import AgregarProductoPasoTres from "./AgregarProductoPasoTres";
import { createProducts, addImagestoProduct } from "@services";
import dayjs from "dayjs";

const AgregarProductosContainer: React.FC = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [sizevalue, setSizevalue] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [imgsToProduct, setImgsListToProduct] = useState<any>([]);
  const [imgProduct, setImgProduct] = useState<any>();
  const [product, setProduct] = useState<any>({
    sizes: [],
    name: "",
    releaseYear: dayjs(),
    price: 0,
    brand: "",
    genre: "",
    quantity: 0,
  });

  const openNotification = (message: string, description: string) => {
    notification.open({
      key: "updatable",
      message: message,
      description: description,
    });
    setTimeout(() => {
      notification.destroy();
    }, 3000);
  };

  const onFinish = async () => {
    try {
      setLoad(true);
      const formData = new FormData();
      formData.append("image", imgProduct.originFileObj);
      formData.append("product", JSON.stringify(product));

      const response = await createProducts({ formData });

      if (response && response.product) {
        openNotification(
          "Producto agregado correctamente",
          "La ventana volvera automaticamente a la primer instancia."
        );

        const imagesFormData = new FormData();
        imgsToProduct.forEach((imaToProducte: any) => {
          imagesFormData.append("images", imaToProducte.originFileObj);
        });

        await addImagestoProduct({
          productId: response.product._id,
          imagesFormData,
        });
        resetForm();
      }
    } catch (error) {
      setLoad(false);
      openNotification(
        "Ocurrió un error al agregar el producto",
        "Por favor vuelva a intentar en unos momentos."
      );
    }
  };

  const resetForm = () => {
    setImgProduct(null);
    setImgsListToProduct([]);
    setCurrentStep(0);
    setLoad(false);
    setProduct({
      sizes: [],
      name: "",
      releaseYear: dayjs(),
      price: 0,
      brand: "",
      genre: "",
      quantity: 0,
    });
  };

  const handleChangeSizeStock = (value: string) => {
    setSizevalue(value);
  };

  const handleSizeInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleDeleteStock = (index: number) => {
    const updatedSizes = product.sizes.filter(
      (_: any, itemIndex: any) => itemIndex !== index
    );
    setProduct({ ...product, sizes: updatedSizes });
  };

  const handleChange = (fieldName: string, value: any) => {
    setProduct({ ...product, [fieldName]: value });
  };

  const handleSaveStock = () => {
    const newSize = {
      size: sizevalue,
      qty: inputValue,
    };
    const prevStock: { size: string; qty: string }[] = product.sizes;
    const existingSizeIndex = prevStock.findIndex(
      (item) => item.size === sizevalue
    );
    if (existingSizeIndex !== -1) {
      prevStock[existingSizeIndex].qty = (
        parseInt(prevStock[existingSizeIndex].qty) + parseInt(inputValue)
      ).toString();
    } else {
      prevStock.push(newSize);
    }
    setProduct({
      ...product,
      sizes: prevStock,
    });
    setSizevalue("");
    setInputValue("");
  };
  return (
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
                <Space size="middle">
                  {product.sizes.map((item: any, index: any) => (
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
          )}
          {currentStep === 1 && (
            <AgregarProductoPasoDos
              handleChangeImages={setImgProduct}
              setImgsListToProduct={setImgsListToProduct}
            />
          )}
          {currentStep === 2 && (
            <AgregarProductoPasoTres
              product={product}
              productImg={imgProduct}
            />
          )}
        </StepsContainer>
      </div>

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
              (currentStep === 1 && !imgProduct)
            }
          >
            Siguiente
          </StyledCustomButton>
        )}
        {currentStep === 2 && (
          <StyledCustomButton
            type="primary"
            onClick={() => onFinish()}
            disabled={load}
          >
            Guardar
          </StyledCustomButton>
        )}
      </div>
    </AddFormContainer>
  );
};

export default AgregarProductosContainer;
