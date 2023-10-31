import React from "react";
import { Input, Select, Space, Badge, Avatar, Switch } from "antd";
import {
  DetailImgContainer,
  DetailImgPosterPath,
  DetailImgDetail,
  EditMode,
  EditPanel,
  StockContainer,
} from "../styles";
import { StyledCustomButton } from "../../styles";
import { editProduct, deleteProduct } from "@services";

const Drawer = ({
  selectedItem,
  selectedItemPoster,
  editmode,
  onChange,
  setSelectedItemPoster,
  handleChange,
}: any) => {
  const handleUpdateProduct = async (item: any) => {
    const res = await editProduct(item);
    console.log(res);
  };

  const handleDeleteProduct = async (item: any) => {
    const res = await deleteProduct(item);
    console.log(res);
  };
  return (
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
            <div
              className="img_detail"
              onClick={() =>
                setSelectedItemPoster(
                  `https://res.cloudinary.com/${
                    import.meta.env.VITE_CLOUD_NAME
                  }/image/upload/v1697492964/${selectedItem.posterPathImage}`
                )
              }
            >
              <img
                style={{ width: "100%" }}
                src={`https://res.cloudinary.com/${
                  import.meta.env.VITE_CLOUD_NAME
                }/image/upload/v1697492964/${selectedItem.posterPathImage}`}
              />
            </div>
          )}
          {selectedItem &&
            selectedItem.imgs.map((item: any, index: any) => (
              <div
                className="img_detail"
                onClick={() =>
                  setSelectedItemPoster(
                    `https://res.cloudinary.com/${
                      import.meta.env.VITE_CLOUD_NAME
                    }/image/upload/v1697492964/${item}`
                  )
                }
              >
                <img
                  style={{ width: "100%" }}
                  src={`https://res.cloudinary.com/${
                    import.meta.env.VITE_CLOUD_NAME
                  }/image/upload/v1697492964/${item}`}
                />
              </div>
            ))}
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
          <StyledCustomButton
            onClick={() => console.log(selectedItem)}
            disabled={!editmode}
            title="Eliminar imagenes del producto"
          >
            Eliminar imagenes
          </StyledCustomButton>
        </div>
      </EditPanel>

      <StockContainer>
        <h3 style={{ marginBottom: "10px" }}>Stock</h3>
        <div className="badge__container">
          <Space size="middle">
            {selectedItem &&
              selectedItem?.sizes.map((item: any) => (
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
  );
};

export default Drawer;
