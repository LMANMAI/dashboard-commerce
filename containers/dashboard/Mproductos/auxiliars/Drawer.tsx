import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Select, Space, Badge, Avatar, Switch, Spin } from "antd";
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
import type { UploadProps } from "antd";
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

  const handleUpdateProduct = async (item: any) => {
    setLoading(true);
    const res = await editProduct(item);
    if (res.status === 200) {
      setLoading(false);
      getData(1, 10);
      onChange(false);
      const res = await getProduct(selectedItem._id);
      if (res) {
        setSelectedItem(res.sneaker);
      }
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
  const handleRemoveImageFromProduct = async (
    id: string,
    imgId: string,
    type: string
  ) => {
    const res = await removeProductImage(id, imgId.split("/")[1], type);
    setLoading(true);
    if (res) {
      console.log(res.sneaker);
      setLoading(false);
      getData(1, 10);
      setSelectedItemPoster(
        `https://res.cloudinary.com/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload/v1697492964/${res.sneaker.posterPathImage}`
      );
      setSelectedItem(res.sneaker);
    }
    console.log(res, "res");
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
          setSelectedItem(res.sneaker);
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
            <Input
              defaultValue={selectedItem?.name}
              addonBefore="Nombre"
              className="input__addform precio"
              placeholder="Buscar por nombre"
              type="text"
              disabled={!editmode}
              onChange={(value) => handleChange(value.target.value, "name")}
            />
            <Input
              defaultValue={selectedItem?.price}
              addonBefore="Precio"
              className="input__addform precio"
              placeholder="Buscar por nombre"
              type="number"
              disabled={!editmode}
              onChange={(value) => handleChange(value.target.value, "price")}
            />
            <Select
              defaultValue={selectedItem?.brand}
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
              defaultValue={selectedItem?.genre}
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

          <StockContainer>
            <h3 style={{ marginBottom: "10px" }}>Stock</h3>
            <div className="badge__container">
              <Space size="middle">
                {selectedItem &&
                  selectedItem.sizes &&
                  selectedItem.sizes.length > 0 &&
                  selectedItem.sizes.map((item: any) => (
                    <div className="button_badge">
                      <button
                        className="button__delete_badge"
                        // onClick={() => handleDeleteStock(index)}
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
          </StockContainer>
        </div>
      )}
    </div>
  );
};

export default Drawer;
