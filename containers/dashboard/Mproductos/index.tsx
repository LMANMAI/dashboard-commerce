import React, { useState, useEffect } from "react";
import { getProducts, searchProduct } from "@services";
import { Table, Input, Select, Button, Modal, notification } from "antd";
import { TaleContainer, MisProductosContainer } from "./styles";
import { StyledCustomButton } from "../styles";
import { SearchOutlined } from "@ant-design/icons";
interface Product {
  key: string;
  name: string;
  price: number;
  imgs: [];
  _id: string;
  posterPathImage: string;
}

const MisProductos: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [searchparam, setSearchParam] = useState({
    name: "",
    genre: "",
    brand: "",
  });
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 123,
  });
  const key = "updatable";
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

  const showDetails = (item: Product) => {
    setSelectedItem(item);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const getData = async (page: any, pageSize: any) => {
    setLoad(true);
    const req = await getProducts({
      page: page,
      pageSize: pageSize,
    });
    if (req.status === 200) {
      setPagination({
        current: req.currenPage,
        pageSize: 10,
        total: req.totalSneakers,
      });
      setProducts(req.data);
      setLoad(false);
    }
  };
  const handleChange = (value: any, fieldName: string) => {
    setSearchParam((prevSearchParam) => ({
      ...prevSearchParam,
      [fieldName]: value,
    }));
  };

  const handleSearch = async () => {
    console.log(searchparam);
    const req = await searchProduct(searchparam);
    if (req.status === 200) {
      setPagination({
        current: req.currenPage,
        pageSize: 10,
        total: req.totalSneakers,
      });
      setProducts(req.data);
      setLoad(false);
    } else if (req.status === 204) {
      openNotification(
        "No se encontro productos que coincidan con la busqueda",
        "Por favor ajuste los valores y vuelva a intentar."
      );
    }
  };
  const modalContent = (
    <div style={{ overflowY: "auto", maxHeight: "750px" }}>
      <div>
        <h2>Detalles del Producto</h2>
        <p>Nombre: {selectedItem && selectedItem.name}</p>
        <p>Precio: {selectedItem && selectedItem.price}</p>
      </div>
      <div>
        <p>imagenes de poster</p>
        <div style={{ height: "300px", width: "300px" }}>
          {selectedItem && (
            <img
              style={{ width: "100%" }}
              src={`https://res.cloudinary.com/${
                import.meta.env.VITE_CLOUD_NAME
              }/image/upload/v1697492964/${selectedItem.posterPathImage}`}
            />
          )}
        </div>
      </div>
      <div>
        <p>imagenes adicionales</p>
        {selectedItem &&
          selectedItem.imgs.map((item, index) => (
            <div style={{ height: "300px", width: "300px" }}>
              <img
                style={{ width: "100%" }}
                src={`https://res.cloudinary.com/${
                  import.meta.env.VITE_CLOUD_NAME
                }/image/upload/v1697492964/${item}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
  const columns = [
    {
      title: "Ver",
      dataIndex: "",
      key: "name",
      render: (text: string, record: Product) => (
        <Button
          onClick={() => showDetails(record)}
          icon={<SearchOutlined />}
        ></Button>
      ),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "age",
    },
    {
      title: "Genero",
      dataIndex: "genre",
      key: "address",
    },
    {
      title: "Cantidad total",
      dataIndex: "",
      key: "address",
    },
    {
      title: "Fecha de lanzamiento",
      dataIndex: "relaseYear",
      key: "address",
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "address",
    },
  ];
  useEffect(() => {
    setLoad(true);
    getData(1, 10);
  }, []);
  return (
    <div>
      {contextHolder}
      <MisProductosContainer>
        <div className="misproductos__box"></div>
        <div className="misproductos__formulario">
          <Input
            addonBefore="Nombre"
            className="input__addform precio"
            placeholder="Buscar por nombre"
            type="text"
          />
          <Select
            defaultValue="Buscar por marca"
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
          />
          <Select
            defaultValue="Buscar por genero"
            onChange={(value) => handleChange(value, "genre")}
            className="select__mproducts"
            options={[
              { value: "", label: "Elige un genero" },
              { value: "MEN", label: "Hombre" },
              { value: "WOMAN", label: "Mujer" },
              { value: "UNISEX", label: "Unisex" },
            ]}
          />
          <StyledCustomButton
            title="Buscar producto"
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => handleSearch()}
          >
            Buscar producto
          </StyledCustomButton>
        </div>
        <TaleContainer>
          <Table
            dataSource={products}
            columns={columns}
            loading={load}
            pagination={pagination}
            onChange={(pagination) => {
              getData(pagination.current, 10);
            }}
          />
        </TaleContainer>
        <Modal
          title="Detalles del Producto"
          visible={visible}
          centered
          onOk={handleCancel}
          onCancel={handleCancel}
          destroyOnClose={true}
          width="80%"
        >
          {modalContent}
        </Modal>
      </MisProductosContainer>
    </div>
  );
};

export default MisProductos;
