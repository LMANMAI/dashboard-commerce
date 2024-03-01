import React from "react";
import { Button } from "antd";

interface Props {
  file: any;
  imgs1: any[];
  onFinish: () => void;
  handlePrevStep: () => void;
  handleChangeFile: (file: any) => void;
  handleChangeImages: (images: any[]) => void;
}

const AgregarProductoPasoDos: React.FC<Props> = ({
  file,
  imgs1,
  onFinish,
  handlePrevStep,
  handleChangeFile,
  handleChangeImages,
}) => {
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

export default AgregarProductoPasoDos;
