import React from "react";
import dayjs from "dayjs";
import {
  DatePicker,
  Button,
  Upload,
  Card,
  Steps,
  Avatar,
  Badge,
  Space,
  UploadProps,
} from "antd";
import {
  AddForm,
  StepsContainer,
  CustomSteps,
  CustomInput,
} from "../../../containers/dashboard/AProductos/styles";
import { SelectComponent } from "../../../components";
import {
  SelectMockDataGenre,
  SelectMockDataSize,
  SelectMockDataBrand,
} from "../../../containers/dashboard/Mproductos/statics";
import { SaveOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";

interface ISteps {
  product: any;
  sizevalue: any;
  inputValue: any;
  file: any;
  imgs1: any;
  currentStep: any;
  setProduct: any;
  setSizevalue: any;
  setInputValue: any;
  setFileList: any;
  setImgsList1: any;
}
const StepsCompoent: React.FC<ISteps> = ({
  product,
  sizevalue,
  inputValue,
  file,
  imgs1,
  currentStep,
  setProduct,
  setSizevalue,
  setInputValue,
  setFileList,
  setImgsList1,
}) => {
  const { Step } = Steps;

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
  const handleChangeSizeStock = (value: string) => {
    setSizevalue(value);
  };
  const handleSizeInputChange = (e: any) => {
    const { value } = e.target;
    setInputValue(value);
  };
  const handleChange = (value: any, fieldName: string) => {
    setProduct({ ...product, [fieldName]: value });
  };
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleDeleteStock = (index: number) => {
    const updatedSizes = product.sizes.filter(
      (_: any, itemIndex: any) => itemIndex !== index
    );

    setProduct({ ...product, sizes: updatedSizes });
  };

  //Componentes del step
  const StepOne = () => {
    return (
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
          <SelectComponent
            label={"Agregar marca"}
            options={SelectMockDataBrand}
            class_select={"select__mproducts"}
            value_label={"brand"}
            handleChange={handleChange}
          />
          <SelectComponent
            label={"Agregar genero"}
            options={SelectMockDataGenre}
            class_select={"select__mproducts"}
            value_label={"genre"}
            handleChange={handleChange}
          />
        </div>
        <div className="input__formadd_container_talle">
          <CustomInput
            className="input__addform qty"
            placeholder="Cantidad"
            value={inputValue}
            type="number"
            addonBefore="Cantidad"
            onChange={handleSizeInputChange}
          />
          <SelectComponent
            label={"Tamaño"}
            options={SelectMockDataSize}
            class_select={"select__mproducts"}
            value_label={"size"}
            handleChange={handleChangeSizeStock}
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
    );
  };
  const StepTwo = () => {
    const propsPosterPath: UploadProps = {
      name: "file",
      action: "http://localhost:3000/add",
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
      action: "http://localhost:3000/add",
      headers: {
        authorization: "authorization-text",
      },
      onChange(info) {
        if (info.file.status === "uploading") {
          setImgsList1(info.fileList);
        } else if (info.file.status === "error") {
        }
      },
    };

    return (
      <div className="button__formadd">
        <div>
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
          </Upload>
          {file && (
            <div className="img_name_upload">
              <p>{file?.name}</p>
              <button
                className="img__delete_btn"
                onClick={() => setFileList(null)}
                title="Eliminar imagen del producto"
              >
                x
              </button>
            </div>
          )}
        </div>
        <div>
          <Upload multiple={true} {...props1}>
            <Button
              title="Imagenes complementarias del producto"
              icon={<UploadOutlined />}
            >
              Imagenes del producto
            </Button>
          </Upload>
          {imgs1.map((item: any, index: number) => {
            return (
              <div className="img_name_upload" key={item.name}>
                <p>{item?.name}</p>
                <button
                  className="img__delete_btn"
                  onClick={() => {
                    const updatedImgs1 = imgs1.filter(
                      (_: any, i: any) => i !== index
                    );
                    setImgsList1(updatedImgs1);
                  }}
                  title="Eliminar imagen del producto"
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
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
        </Card>
      </div>
    );
  };

  return (
    <div>
      <CustomSteps size="small" current={currentStep} labelPlacement="vertical">
        <Step title="información" />
        <Step title="Imagenes" />
        <Step title="Guardar" />
      </CustomSteps>
      <StepsContainer>
        {currentStep === 0 && <StepOne />}
        {currentStep === 1 && <StepTwo />}
        {currentStep === 2 && <LastStep />}
      </StepsContainer>
    </div>
  );
};

export default StepsCompoent;
