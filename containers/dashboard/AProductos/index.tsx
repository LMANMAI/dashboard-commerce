import { useState } from "react";
import { AddFormContainer } from "./styles";
import { notification } from "antd";
import { StyledCustomButton } from "../styles";
import { addImagestoProduct, createProducts } from "@services";
import { StepsCompoent } from "../../../components";
const key = "updatable";

const AgregarProductos = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFileList] = useState<any>();
  const [load, setLoad] = useState<boolean>(false);
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
    await createProducts({ formData })
      .then(async (response: any) => {
        openNotification(
          "Producto agregado correctamente",
          "Por favor vuelva a intentar en unos momentos."
        );
        const imagesFormData = new FormData();
        imagesFormData.append("images", imgs1[0]?.originFileObj);
        imagesFormData.append("images", imgs1[1]?.originFileObj);
        imagesFormData.append("images", imgs1[2]?.originFileObj);
        const productId = response.sneaker._id;
        await addImagestoProduct({ productId, imagesFormData })
          .then(() => {
            openNotification(
              "imagenes agregadas correctamente",
              "Por favor vuelva a intentar en unos momentos."
            );
            setFileList(null);
            setImgsList1([]);
            setCurrentStep(0);
            setLoad(false);
            setProduct({
              sizes: [],
              name: "",
              relaseYear: "2021-04-15",
              price: 0,
              brand: "",
              genre: "",
              quantity: 0,
            });
          })
          .catch(() => {
            setLoad(false);
            openNotification(
              "Ocurrio un error al agregar las imagenes al producto",
              "Por favor vuelva a intentar en unos momentos."
            );
          });
      })
      .catch(() => {
        setLoad(false);
        openNotification(
          "Ocurrio un error al agregar el producto",
          "Por favor vuelva a intentar en unos momentos."
        );
      });
  };

  return (
    <div style={{ width: "100%" }}>
      {contextHolder}
      <AddFormContainer>
        <div className="steps">
          <StepsCompoent
            product={product}
            sizevalue={sizevalue}
            inputValue={inputValue}
            file={file}
            imgs1={imgs1}
            currentStep={currentStep}
            setProduct={setProduct}
            setSizevalue={setSizevalue}
            setInputValue={setInputValue}
            setFileList={setFileList}
            setImgsList1={setImgsList1}
          />
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
              <StyledCustomButton
                type="primary"
                onClick={() => onFinish()}
                disabled={load}
              >
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
