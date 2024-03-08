import React, { useContext } from "react";
import { AddFormContainer, StepsContainer, CustomSteps } from "./styles";
import { StyledCustomButton } from "../styles";
import { notification, Steps } from "antd";
import {
  AgregarProductoPasoUno,
  AgregarProductoPasoDos,
  AgregarProductoPasoTres,
} from "./auxiliars/steps";
import { createProducts, addImagestoProduct } from "@services";
import { FunctionsAgregarContext } from "../../../context/functionsAgregrarProductosContext";

const AgregarProductosContainer: React.FC = () => {
  const { Step } = Steps;
  const {
    currentStep,
    product,
    imgProduct,
    imgsToProduct,
    load,
    setCurrentStep,
    setLoad,
    resetForm,
  } = useContext(FunctionsAgregarContext);

  const openNotification = (message: string, description: string) => {
    notification.open({
      key: "updatable",
      message: message,
      description: description,
      placement: "bottomRight",
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
          "La ventana volvera automaticamente a la primer instancia para agregar más productos."
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

  const disabledButton =
    (currentStep === 0 &&
      (product.name === "" || product.genre === "" || product.brand === "")) ||
    (currentStep === 1 && !imgProduct);

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
          {currentStep === 0 && <AgregarProductoPasoUno />}
          {currentStep === 1 && <AgregarProductoPasoDos />}
          {currentStep === 2 && <AgregarProductoPasoTres />}
        </StepsContainer>
      </div>

      <div className="button_actions_steps">
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
            disabled={disabledButton}
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
