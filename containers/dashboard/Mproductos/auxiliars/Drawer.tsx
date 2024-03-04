import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Input,
  Select,
  Space,
  Badge,
  Avatar,
  Switch,
  Spin,
  Button,
  DatePicker,
} from "antd";
import {
  DetailImgContainer,
  DetailImgPosterPath,
  DetailImgDetail,
  EditMode,
  EditPanel,
  StockContainer,
  StyledUpload,
  LoadingContainer,
} from "../styles";
import { StyledCustomButton } from "../../styles";
import {
  editProduct,
  deleteProduct,
  getProduct,
  removeProductImage,
} from "@services";
import { CustomInput } from "../../AgregarProductos/styles";
import { SaveOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import dayjs from "dayjs";
const Drawer = ({
  selectedItem,
  selectedItemPoster,
  editmode,
  onChange,
  setSelectedItemPoster,
  handleChange,
  getData,
  onClose,
  setSelectedItem,
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [sizevalue, setSizevalue] = useState<string>("");

  const handleChangeSizeStock = (value: string) => {
    setSizevalue(value);
  };
  const handleUpdateProduct = async (item: any) => {
    setLoading(true);
    const res = await editProduct(item);
    if (res.status === 200) {
      setLoading(false);
      getData(1, 10);
      onChange(false);
      onClose();
    }
  };
  const handleDeleteProduct = async (item: any) => {
    const res = await deleteProduct(item);
    console.log(res);
    if (res.status === 200) {
      getData(1, 10);
      onClose();
    }
  };
  const handleSizeInputChange = (e: any) => {
    const { value } = e.target;
    setInputValue(value);
  };
  const handleRemoveImageFromProduct = async (
    id: string,
    imgId: string,
    type: string
  ) => {
    const res = await removeProductImage(id, imgId.split("/")[1], type);
    setLoading(true);
    if (res) {
      setLoading(false);
      getData(1, 10);
      setSelectedItemPoster(
        `https://res.cloudinary.com/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload/v1697492964/${res.product.posterPathImage}`
      );
      setSelectedItem(res.product);
    }
  };
  const handleSaveStock = async () => {
    const newSize = {
      size: sizevalue,
      qty: inputValue,
    };
    const prevStock = Array.isArray(selectedItem.sizes)
      ? selectedItem.sizes
      : [];

    const existingSizeIndex = prevStock.findIndex(
      (item: any) => item.size === sizevalue
    );

    if (existingSizeIndex !== -1) {
      prevStock[existingSizeIndex].qty = (
        parseInt(prevStock[existingSizeIndex].qty) + parseInt(inputValue)
      ).toString();
    } else {
      prevStock.push(newSize);
    }
    setSelectedItem({
      ...selectedItem,
      sizes: prevStock,
    });
  };
  const handleDeleteStock = (index: number) => {
    const updatedSizes = selectedItem.sizes.filter(
      (_: any, itemIndex: any) => itemIndex !== index
    );

    setSelectedItem({ ...selectedItem, sizes: updatedSizes });
  };

  const props1: UploadProps = {
    name: "images",
    action: `${import.meta.env.VITE_URL_EP}/productimages/${selectedItem._id}`,
    method: "PUT",
    headers: {
      authorization: "authorization-text",
    },
    async onChange(info) {
      if (
        info.file.status === "done" &&
        info.fileList.every((file) => file.status === "done")
      ) {
        setLoading(true);
        getData(1, 10);
        const res = await getProduct(selectedItem._id);
        if (res) {
          setSelectedItem(res.product);
          onChange(false);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else if (info.file.status === "error") {
      }
    },
  };
  const propsPosterImg: UploadProps = {
    name: "image",
    action: `${import.meta.env.VITE_URL_EP}/updateposterimage/${
      selectedItem._id
    }`,
    method: "PUT",
    headers: {
      authorization: "authorization-text",
    },
    async onChange(info) {
      if (
        info.file.status === "done" &&
        info.fileList.every((file) => file.status === "done")
      ) {
        setLoading(true);
        getData(1, 10);
        const res = await getProduct(selectedItem._id);
        if (res) {
          setSelectedItem(res.sneaker);
          onChange(false);
          setSelectedItemPoster(
            `https://res.cloudinary.com/${
              import.meta.env.VITE_CLOUD_NAME
            }/image/upload/v1697492964/${res.sneaker.posterPathImage}`
          );
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else if (info.file.status === "error") {
      }
    },
  };

  return (
    <div>
      {loading ? (
        <div>
          <LoadingContainer>
            <p>Obteniendo información</p>
            <Spin tip="Obteniendo información" size="large" />
          </LoadingContainer>
        </div>
      ) : (
        <div>
          <EditMode>
            <p>Editar producto</p>
            <Switch size="small" onChange={onChange} />
          </EditMode>
          <DetailImgContainer>
            <DetailImgPosterPath>
              {selectedItem && (
                <img style={{ width: "100%" }} src={selectedItemPoster} />
              )}
            </DetailImgPosterPath>

            <DetailImgDetail>
              {selectedItem && (
                <div className="img_detail">
                  {selectedItem.posterPathImage !== "" ? (
                    <img
                      style={{ width: "100%" }}
                      onClick={() =>
                        setSelectedItemPoster(
                          `https://res.cloudinary.com/${
                            import.meta.env.VITE_CLOUD_NAME
                          }/image/upload/v1697492964/${
                            selectedItem.posterPathImage
                          }`
                        )
                      }
                      src={`https://res.cloudinary.com/${
                        import.meta.env.VITE_CLOUD_NAME
                      }/image/upload/v1697492964/${
                        selectedItem.posterPathImage
                      }`}
                    />
                  ) : (
                    <div title="Agregar imagen de portada.">
                      <StyledUpload
                        style={{ width: "50px" }}
                        listType="picture-card"
                        className="upload-list-inline"
                        {...propsPosterImg}
                      >
                        <div>
                          <PlusOutlined />
                        </div>
                      </StyledUpload>
                    </div>
                  )}
                  {editmode && selectedItem.posterPathImage !== "" && (
                    <button
                      className="button__delete_badge"
                      onClick={() =>
                        handleRemoveImageFromProduct(
                          selectedItem._id,
                          selectedItem.posterPathImage,
                          "poster"
                        )
                      }
                      title="Eliminar imagen del producto"
                    >
                      x
                    </button>
                  )}
                </div>
              )}
              {selectedItem && selectedItem.imgs.length > 0
                ? selectedItem.imgs.map((item: any, index: any) => (
                    <div key={index} className="img_detail">
                      <div className="img_container">
                        {editmode && (
                          <button
                            className="button__delete_badge"
                            onClick={() =>
                              handleRemoveImageFromProduct(
                                selectedItem._id,
                                item,
                                "image"
                              )
                            }
                            title="Eliminar imagen del producto"
                          >
                            x
                          </button>
                        )}
                        <img
                          onClick={() =>
                            setSelectedItemPoster(
                              `https://res.cloudinary.com/${
                                import.meta.env.VITE_CLOUD_NAME
                              }/image/upload/v1697492964/${item}`
                            )
                          }
                          style={{ width: "100%" }}
                          src={`https://res.cloudinary.com/${
                            import.meta.env.VITE_CLOUD_NAME
                          }/image/upload/v1697492964/${item}`}
                        />
                      </div>
                    </div>
                  ))
                : null}
              {selectedItem && selectedItem.imgs.length < 3 && editmode && (
                <div title="Agregar imagen de producto.">
                  <StyledUpload
                    style={{ width: "50px" }}
                    listType="picture-card"
                    multiple
                    className="upload-list-inline"
                    {...props1}
                  >
                    <div>
                      <PlusOutlined />
                    </div>
                  </StyledUpload>
                </div>
              )}
            </DetailImgDetail>
          </DetailImgContainer>

          <EditPanel>
            <StockContainer>
              <h3 style={{ marginBottom: "10px" }}>Stock</h3>
              <div className="badge__container">
                <Space
                  size="middle"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "10px 0px",
                  }}
                >
                  {selectedItem &&
                    selectedItem.sizes &&
                    selectedItem.sizes.length > 0 &&
                    selectedItem.sizes
                      .sort((a: any, b: any) => a.size - b.size)
                      .map((item: any, index: number) => (
                        <div className="button_badge" key={index}>
                          {editmode && (
                            <button
                              className="button__delete_badge"
                              onClick={() => handleDeleteStock(index)}
                              title="Eliminar producto del stock"
                            >
                              x
                            </button>
                          )}
                          <Badge
                            size="small"
                            count={item.qty}
                            color={"#4E7A9C"}
                          >
                            <Avatar shape="square" size="small">
                              {item.size}
                            </Avatar>
                          </Badge>
                        </div>
                      ))}
                </Space>
              </div>

              {editmode && (
                <div className="input__formadd_container_talle">
                  <CustomInput
                    className="input__addform qty"
                    placeholder="Cantidad"
                    value={inputValue}
                    type="number"
                    disabled={!editmode}
                    addonBefore="Cantidad"
                    onChange={handleSizeInputChange}
                  />
                  <Select
                    defaultValue="Tamaño"
                    onChange={handleChangeSizeStock}
                    style={{ width: 250 }}
                    disabled={!editmode}
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
                    disabled={!editmode}
                    icon={<SaveOutlined />}
                  >
                    Guardar
                  </Button>
                </div>
              )}
            </StockContainer>
            <Input
              value={selectedItem.name}
              addonBefore="Nombre"
              className="input__addform precio"
              placeholder="Buscar por nombre"
              type="text"
              disabled={!editmode}
              onChange={(value) => handleChange(value.target.value, "name")}
            />
            <Input
              value={selectedItem.price}
              addonBefore="Precio"
              className="input__addform precio"
              placeholder="Buscar por nombre"
              type="number"
              disabled={!editmode}
              onChange={(value) => handleChange(value.target.value, "price")}
            />
            <Select
              value={selectedItem.brand}
              onChange={(value) => handleChange(value, "brand")}
              className="select__mproducts"
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
              disabled={!editmode}
            />
            <Select
              value={selectedItem.genre}
              onChange={(value) => handleChange(value, "genre")}
              className="select__mproducts"
              options={[
                { value: "", label: "Elige un genero" },
                { value: "MEN", label: "Hombre" },
                { value: "WOMAN", label: "Mujer" },
                { value: "UNISEX", label: "Unisex" },
              ]}
              disabled={!editmode}
            />

            <DatePicker
              className="datepicker__addform"
              disabled={!editmode}
              value={
                selectedItem.releaseYear && dayjs(selectedItem.releaseYear)
              }
              onChange={(date: any) => {
                if (date) {
                  setSelectedItem({
                    ...selectedItem,
                    releaseYear: date,
                  });
                }
              }}
              format={"DD/MM/YY"}
            />

            <div style={{ display: "flex", gap: "5px", margin: "10px 0px" }}>
              <StyledCustomButton
                onClick={() => handleUpdateProduct(selectedItem)}
                disabled={!editmode}
                title="Guardar edicion"
              >
                Editar
              </StyledCustomButton>
              <StyledCustomButton
                style={{ fontSize: "12px" }}
                onClick={() => handleDeleteProduct(selectedItem._id)}
                disabled={!editmode}
                title="Eliminar producto"
              >
                Eliminar
              </StyledCustomButton>
            </div>
          </EditPanel>
        </div>
      )}
    </div>
  );
};

export default Drawer;
