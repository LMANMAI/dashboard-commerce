import React, { useState } from "react";
import { AddFormContainer, AddForm, AddButonContainer } from "./styles";
import { UploadOutlined } from "@ant-design/icons";
import type { DatePickerProps, UploadProps, UploadFile } from "antd";
import {
  Input,
  DatePicker,
  Select,
  Button,
  message,
  Upload,
  Modal,
} from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps as UploadPropsB } from "antd/es/upload";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AgregarProductos = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChangeCover: UploadPropsB["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Foto de producto</div>
    </div>
  );

  return (
    <div>
      <h3
        style={{ color: "white", padding: "10px", margin: "10px 25px" }}
        className="bg-neutral"
      >
        Add products
      </h3>
      <AddFormContainer>
        <AddForm>
          <Input placeholder="Nombre" type="text" />
          <Input placeholder="Precio" type="number" />
          <DatePicker onChange={onChange} />
          <Select
            defaultValue="Elige una marca"
            onChange={handleChange}
            style={{ width: 120 }}
            options={[
              { value: "jack", label: "Elige una marca" },
              { value: "jack", label: "Nike" },
              { value: "lucy", label: "Adidas" },
              { value: "Yiminghe", label: "Vans" },
              { value: "disabled", label: "Converse" },
            ]}
          />

          <Upload {...props}>
            <Button icon={<UploadOutlined />}>
              Imagen de portada del producto
            </Button>
          </Upload>

          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChangeCover}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </AddForm>
        {/* <AddButonContainer className="btn btn-neutral">
          save item
        </AddButonContainer> */}
        <Button type="primary" icon={<SaveOutlined />}>
          Guardar producto
        </Button>
      </AddFormContainer>
    </div>
  );
};

export default AgregarProductos;
