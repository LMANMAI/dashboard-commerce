import React, { useState, useEffect } from "react";
import { getProducts, searchProduct } from "@services";
import { Table, Input, Button, notification, Drawer, Modal, Card } from "antd";
import { SelectComponent } from "../../../components";
import {
  TaleContainer,
  MisProductosContainer,
  ModalAddPromotionsContainer,
  ModalCurrentPromotion,
} from "./styles";
import { StyledCustomButton } from "../styles";
import { SearchOutlined } from "@ant-design/icons";
import {
  IProduct,
  SelectMockDataGenre,
  SelectMockDataSize,
  SelectMockDataBrand,
} from "./statics";
import { DrawerComponent } from "./auxiliars";
import { DeleteOutlined } from "@ant-design/icons";

const MisProductos: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IProduct | any>(null);
  const [promotion, setParametersPromotions] = useState<IProduct | any>(null);
  const [selectedItemPoster, setSelectedItemPoster] = useState<string>("");
  const [editmode, setEditMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mockdatapromos, setMockDataPromo] = useState<any>([
    {
      afectedProduct: {
        brand: "ADIDAS",
        genre: "MEN",
        size: "6.5",
      },
      id: "001",
      value: 3,
    },
    {
      afectedProduct: {
        brand: "NIKE",
        genre: "MEN",
        size: "6.5",
      },
      id: "002",
      value: 20,
    },
    {
      afectedProduct: {
        brand: "VANS",
        genre: "MEN",
        size: "6.5",
      },
      id: "003",
      value: 36,
    },
    {
      afectedProduct: {
        brand: "ADIDAS",
        genre: "MEN",
        size: "6.5",
      },
      id: "004",
      value: 3,
    },
    {
      afectedProduct: {
        brand: "NIKE",
        genre: "MEN",
        size: "6.5",
      },
      id: "005",
      value: 20,
    },
    {
      afectedProduct: {
        brand: "VANS",
        genre: "MEN",
        size: "6.5",
      },
      id: "006",
      value: 36,
    },
    {
      afectedProduct: {
        brand: "ADIDAS",
        genre: "MEN",
        size: "6.5",
      },
      id: "007",
      value: 3,
    },
    {
      afectedProduct: {
        brand: "NIKE",
        genre: "MEN",
        size: "6.5",
      },
      id: "008",
      value: 20,
    },
    {
      afectedProduct: {
        brand: "VANS",
        genre: "MEN",
        size: "6.5",
      },
      id: "009",
      value: 36,
    },
  ]);
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
  const [promovalue, setPromoValue] = useState<number | any>();
  const [currentContent, setCurrentContent] = useState(1);
  const key = "updatable";
  const [api, contextHolder] = notification.useNotification();

  const showDrawer = (item: any) => {
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
    setSearchParam((prevSearchParam) => ({
      ...prevSearchParam,
      [fieldName]: value,
    }));
  };
  const handleChangePromotionsDTO = (value: any, fieldName: string) => {
    setParametersPromotions((prevSearchParam: any) => ({
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

  const { Meta } = Card;

  const getContent = () => {
    switch (currentContent) {
      case 1:
        return (
          <div>
            <h2>Agregar una promoción</h2>
            <div>
              <p>
                Seleccione el tipo de productos al que quiere aplciarle un
                descuento, recuerde que las promociones vigentes de pueden
                visualizar en el menu continuo de{" "}
                <strong>"Mis promociones"</strong> y se deben eliminar en el
                menu de <strong>"Eliminar Promociones"</strong>
              </p>

              <ModalAddPromotionsContainer>
                <div className="select__discount">
                  <SelectComponent
                    label={"Buscar por marca"}
                    options={SelectMockDataBrand}
                    class_select={"select__mproducts"}
                    value_label={"brand"}
                    handleChange={handleChangePromotionsDTO}
                  />
                  <div></div>
                </div>

                <div className="select__discount">
                  <SelectComponent
                    label={"Buscar por genero"}
                    options={SelectMockDataGenre}
                    class_select={"select__mproducts"}
                    value_label={"genre"}
                    handleChange={handleChangePromotionsDTO}
                  />
                  <div></div>
                </div>

                <div className="select__discount">
                  <SelectComponent
                    label={"Tamaño"}
                    options={SelectMockDataSize}
                    class_select={"select__mproducts"}
                    value_label={"size"}
                    handleChange={handleChangePromotionsDTO}
                  />

                  <div></div>
                </div>

                <div className="input__discount">
                  <Input
                    addonBefore="Valor del descuento"
                    addonAfter="%"
                    className="input__addform precio"
                    placeholder="ej: 2"
                    type="number"
                    name="name"
                    value={promovalue}
                    onChange={(value) => setPromoValue(value.target.value)}
                  />
                </div>
              </ModalAddPromotionsContainer>
            </div>
          </div>
        );
      case 2:
        return (
          <ModalCurrentPromotion>
            <h2>Promociones vigentes</h2>
            <div className="current_promotion">
              {mockdatapromos.map((item: any) => {
                return (
                  <Card
                    style={{ width: 175 }}
                    actions={[
                      <DeleteOutlined
                        key="setting"
                        onClick={() => {
                          const updatedPromos = mockdatapromos.filter(
                            (itemfilter: any) => item.id !== itemfilter.id
                          );
                          setMockDataPromo(updatedPromos);
                        }}
                      />,
                    ]}
                  >
                    <Meta title={`Promocion #${item.id}`} />
                    <p>Marca: {item.afectedProduct.brand}</p>
                    <p>Talle: {item.afectedProduct.size}</p>
                    <p>Genero: {item.afectedProduct.genre}</p>
                    <p>Descuento del {item.value}%</p>
                  </Card>
                );
              })}
            </div>
          </ModalCurrentPromotion>
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
        <div className="misproductos__box">
          <div
            onClick={() => {
              showModal(1);
            }}
            title="Agregar una promocion para los productos en stock"
            className="misproductos__box__button"
          >
            Agregar promocion
          </div>
          <div
            onClick={() => {
              showModal(2);
            }}
            className="misproductos__box__button"
            title="Ver promociones vigentes"
          >
            Promociones vigentes
          </div>
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={currentContent !== 1 ? "70dvw" : "40dvw"}
            footer={[
              <Button
                key="cancel"
                onClick={handleCancel}
                style={{ marginRight: 8 }}
              >
                Cancelar
              </Button>,
              currentContent === 1 && (
                <Button
                  key="ok"
                  type="primary"
                  onClick={() =>
                    console.log({
                      afectedProduct: promotion,
                      value: parseFloat(promovalue),
                    })
                  }
                >
                  Guardar
                </Button>
              ),
            ]}
          >
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
          <SelectComponent
            label={"Buscar por marca"}
            options={SelectMockDataBrand}
            class_select={"select__mproducts"}
            value_label={"brand"}
            handleChange={handleChange}
          />
          <SelectComponent
            label={"Buscar por genero"}
            options={SelectMockDataGenre}
            class_select={"select__mproducts"}
            value_label={"genre"}
            handleChange={handleChange}
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
