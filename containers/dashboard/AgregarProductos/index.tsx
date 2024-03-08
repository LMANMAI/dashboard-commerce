import React, { useContext } from "react";
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
import AgregarProductoPasoDos from "./auxiliars/steps/AgregarProductoPasoDos";
import AgregarProductoPasoTres from "./auxiliars/steps/AgregarProductoPasoTres";
import { createProducts, addImagestoProduct } from "@services";
import {
  SelectMockDataSize,
  SelectMockDataGenre,
  SelectMockDataBrand,
} from "../Mproductos/statics";
import dayjs from "dayjs";
import { FunctionsAgregarContext } from "context/functionsAgregrarProductosContext";

const AgregarProductosContainer: React.FC = () => {
  const { Step } = Steps;
  const {
    currentStep,
    product,
    inputValue,
    imgProduct,
    imgsToProduct,
    load,
    setCurrentStep,
    setLoad,
    resetForm,
    handleChange,
    setProduct,
    handleDeleteStock,
    setImgProduct,
    setImgsListToProduct,
    handleChangeSizeStock,
    handleSizeInputChange,
    handleSaveStock,
  } = useContext(FunctionsAgregarContext);

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
  //Funciones
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
