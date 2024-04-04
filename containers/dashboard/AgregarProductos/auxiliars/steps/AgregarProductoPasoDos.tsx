import React, { useContext } from "react";
import { Button, Upload, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FunctionsAgregarContext } from "../../../../../context/functionsAgregrarProductosContext";

const AgregarProductoPasoDos: React.FC = () => {
  const { setImgProduct, setImgsListToProduct } = useContext(
    FunctionsAgregarContext
  );

  const handleRemove = () => {
    setImgProduct(null);
  };

  const propsPosterPath: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onRemove: handleRemove,
    onChange(info) {
      if (info.file.status === "uploading") {
        setImgProduct(info.file);
      } else if (info.file.status === "error") {
      }
    },
  };
  const props1: UploadProps = {
    name: "images",
    action: `https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188`,
    multiple: true,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status === "uploading") {
        setImgsListToProduct(info.fileList);
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
      </div>
    </div>
  );
};

export default AgregarProductoPasoDos;
