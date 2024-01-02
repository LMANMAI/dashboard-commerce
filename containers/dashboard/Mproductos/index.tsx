import React, { useState, useEffect } from "react";
import { getProducts, searchProduct } from "@services";
import {
  Table,
  Input,
  Select,
  Button,
  notification,
  Drawer,
  Modal,
} from "antd";
import { TaleContainer, MisProductosContainer } from "./styles";
import { StyledCustomButton } from "../styles";
import { SearchOutlined } from "@ant-design/icons";
import { IProduct } from "./statics";
import { DrawerComponent } from "./auxiliars";

const MisProductos: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IProduct | any>(null);
  const [selectedItemPoster, setSelectedItemPoster] = useState<string>("");
  const [editmode, setEditMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchparam, setSearchParam] = useState({
    name: "",
    genre: "",
    brand: "",
  });
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 123,
  });
  const [open, setOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(1);
  const key = "updatable";
  const [api, contextHolder] = notification.useNotification();
  const showDrawer = (item: any) => {
    console.log(item);
    setOpen(true);
    setSelectedItem(item);
    setSelectedItemPoster(
      `https://res.cloudinary.com/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/upload/v1697492964/${item.posterPathImage}`
    );
  };
  const onClose = () => {
    setOpen(false);
  };
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
    console.log(value);
    setSearchParam((prevSearchParam) => ({
      ...prevSearchParam,
      [fieldName]: value,
    }));
  };
  const handleChangeEditMode = (value: any, fieldName: string) => {
    setSelectedItem({
      ...selectedItem,
      [fieldName]: value,
    });
  };
  const handleSearch = async () => {
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

  const onChange = (checked: boolean) => {
    setEditMode(checked);
  };
  const showModal = (type: number) => {
    setIsModalOpen(true);
    setCurrentContent(type);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Ver",
      dataIndex: "",
      key: "name",
      render: (_: string, record: IProduct) => (
        <Button
          onClick={() => {
            showDrawer(record);
          }}
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
    getData(1, 10);
  }, []);

  const getContent = () => {
    switch (currentContent) {
      case 1:
        return (
          <div>
            <h2>Agregar una promoción</h2>
            <p>Este es el primer contenido.</p>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Promociones vigentes</h2>
            <p>Este es el segundo contenido.</p>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Eliminar promociones</h2>
            <p>Este es el tercer contenido.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {contextHolder}
      <MisProductosContainer>
        <div
          className="misproductos__box"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div
            onClick={() => {
              showModal(1);
            }}
            title="Agregar una promocion para los productos en stock"
            style={{
              width: "33%",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
              backgroundColor: "#4E7A9C",
              color: "white",
              height: "45px",
              fontSize: "13px",
            }}
          >
            Agregar promocion
          </div>
          <div
            onClick={() => {
              showModal(2);
            }}
            title="Ver promociones vigentes"
            style={{
              width: "33%",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
              backgroundColor: "#4E7A9C",
              color: "white",
              height: "45px",
              fontSize: "13px",
            }}
          >
            Promociones vigentes
          </div>
          <div
            onClick={() => {
              showModal(3);
            }}
            title="Eliminar promociones"
            style={{
              width: "33%",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
              backgroundColor: "#4E7A9C",
              color: "white",
              height: "45px",
              fontSize: "13px",
            }}
          >
            Eliminar promociones
          </div>
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            {getContent()}
          </Modal>
        </div>
        <div className="misproductos__formulario">
          <Input
            addonBefore="Nombre"
            className="input__addform precio"
            placeholder="Buscar por nombre"
            type="text"
            name="name"
            value={searchparam.name}
            onChange={(value) => handleChange(value.target.value, "name")}
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
        <Drawer
          title="Detalle del producto"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <DrawerComponent
            selectedItem={selectedItem}
            selectedItemPoster={selectedItemPoster}
            editmode={editmode}
            onChange={onChange}
            setSelectedItemPoster={setSelectedItemPoster}
            handleChange={handleChangeEditMode}
            getData={getData}
            onClose={onClose}
            setSelectedItem={setSelectedItem}
          />
        </Drawer>
      </MisProductosContainer>
    </div>
  );
};

export default MisProductos;
