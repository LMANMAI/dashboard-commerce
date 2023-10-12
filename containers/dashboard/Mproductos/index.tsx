import React, { useState, useEffect } from "react";
import { getProducts } from "@services";
import { Table, Input, Select, Button, Modal } from "antd";
import { TaleContainer, MisProductosContainer } from "./styles";
import { Title, StyledCustomButton } from "../styles";
import { SearchOutlined } from "@ant-design/icons";
interface Product {
  key: string;
  name: string;
  price: number;
  description: string;
}

const MisProductos: React.FC = () => {
  const [activeprod, setActiveProd] = useState<any>({});
  const [products, setProducts] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  const showDetails = (item: Product) => {
    setSelectedItem(item);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const getData = async () => {
    setLoad(true);
    const req = await getProducts();
    if (req) {
      setProducts(req.sneakers);
      setLoad(false);
    }
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  useEffect(() => {
    setLoad(true);
    getData();
  }, []);

  const modalContent = (
    <div>
      <h2>Detalles del Producto</h2>
      <p>Nombre: {selectedItem && selectedItem.name}</p>
      <p>Precio: {selectedItem && selectedItem.price}</p>
      <p>Descripción: {selectedItem && selectedItem.description}</p>
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
  ];

  return (
    <div>
      {/* <Title>Mis productos</Title> */}

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
            onChange={handleChange}
            style={{ width: 250 }}
            options={[
              { value: "jack", label: "Elige una marca" },
              { value: "jack", label: "Nike" },
              { value: "lucy", label: "Adidas" },
              { value: "Yiminghe", label: "Vans" },
              { value: "disabled", label: "Converse" },
            ]}
          />
          <Select
            defaultValue="Buscar por genero"
            onChange={handleChange}
            style={{ width: 250 }}
            options={[
              { value: "jack", label: "Elige un genero" },
              { value: "jack", label: "Hombre" },
              { value: "lucy", label: "Mujer" },
              { value: "lucy", label: "Unisex" },
            ]}
          />
          <StyledCustomButton
            title="Buscar producto"
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => getData()}
          >
            Buscar producto
          </StyledCustomButton>
        </div>
        <TaleContainer>
          <Table dataSource={products} columns={columns} loading={load} />
        </TaleContainer>
        <Modal
          title="Detalles del Producto"
          visible={visible}
          onOk={handleCancel}
          onCancel={handleCancel}
        >
          {modalContent}
        </Modal>
      </MisProductosContainer>
    </div>
  );
};

export default MisProductos;
