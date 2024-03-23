import React, { useState, useEffect, useContext } from "react";
import {
  getProducts,
  searchProduct,
  createPromotion,
  getCurrentPromotions,
  deletePromotion,
} from "@services";
import { Table, Input, Button, notification, Drawer, Modal } from "antd";
import { SelectComponent } from "../../../components";
import { TaleContainer, MisProductosContainer } from "./styles";
import { StyledCustomButton } from "../styles";
import { SearchOutlined } from "@ant-design/icons";
import { SelectMockDataGenre, SelectMockDataBrand } from "./statics";
import {
  AddPromotionComponent,
  CurrentPromotionsComponent,
  DrawerComponent,
} from "./auxiliars";
import { FunctionsContext } from "../../../context/functionsMisProductosContext";

const MisProductos: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [mockdatapromos, setMockDataPromo] = useState<any>([]);
  const [loadPromotions, setLoadPromotions] = useState<boolean>(false);
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 10,
  });
  const key = "updatable";
  const [api, contextHolder] = notification.useNotification();
  const {
    initialColumns,
    currentContent,
    open,
    isModalOpen,
    searchparam,
    promotion,
    promovalue,
    discountName,
    showModal,
    handleOk,
    handleCancel,
    handleChangeSearchParams,
    setOpen,
    setEditMode,
    setParametersPromotions,
    setPromoValue,
    setDiscountName,
  } = useContext(FunctionsContext);

  const onClose = () => {
    setOpen(false);
    setEditMode(false);
  };
  const openNotification = (message: string, description: string) => {
    api.open({
      key,
      message: message,
      description: description,
      placement: "bottomRight",
    });

    setTimeout(() => {
      api.destroy();
    }, 3000);
  };

  //llamadas a los servicios
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
        total: req.totalproducts,
      });
      setProducts(req.data);
      setLoad(false);
    }
  };
  const savePromotion = async (promotion: any) => {
    setLoadPromotions(true);
    const req = await createPromotion({ promotion });
    if (req.status === 200) {
      setPromoValue(0);
      setParametersPromotions({
        brand: "",
        genre: "",
      });
      openNotification(
        "Promocion agregada correctamente",
        "Se restablecera el formulario para agregar otra promoción"
      );
      getActivePromotions();
      setLoadPromotions(false);
      setDiscountName("");
    } else {
      setMockDataPromo([]);
      setLoadPromotions(false);
      openNotification(
        "Ocurrio un error al guardar las promociones",
        "vuelva a intentar en unos momentos."
      );
    }
  };
  const getActivePromotions = async () => {
    setLoadPromotions(true);
    const res = await getCurrentPromotions();
    if (res.status === 200) {
      setMockDataPromo(res.currentPromotions);

      setTimeout(() => {
        setLoadPromotions(false);
      }, 2000);
    } else {
      setMockDataPromo([]);
      setLoadPromotions(false);
      openNotification(
        "Ocurrio un error al traer las promociones",
        "vuelva a intentar en unos momentos."
      );
    }
  };
  const deleteCurrentPromotion = async (promotionId: string) => {
    setLoadPromotions(true);
    const res = await deletePromotion(promotionId);
    if (res.status === 200) {
      setLoadPromotions(false);
      openNotification(
        "Promocion eliminada correctamente",
        "Se elimino la promoción y los productos volvieron a su precio original."
      );
    } else {
      setMockDataPromo([]);
      setLoadPromotions(false);
      openNotification(
        "Ocurrio un error al eliminar la promoción",
        "vuelva a intentar en unos momentos."
      );
    }
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

  useEffect(() => {
    getData(1, 10);
  }, []);

  const getContent = () => {
    switch (currentContent) {
      case 1:
        return <AddPromotionComponent />;
      case 2:
        return (
          <CurrentPromotionsComponent
            mockDataPromos={mockdatapromos}
            loadPromotions={loadPromotions}
            setMockDataPromo={setMockDataPromo}
            deleteCurrentPromotion={deleteCurrentPromotion}
          />
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
              getActivePromotions();
              showModal(1);
            }}
            title="Agregar una promocion para los productos en stock"
            className="misproductos__box__button"
          >
            <p>Agregar promocion</p>
          </div>
          <div
            onClick={() => {
              getActivePromotions();
              showModal(2);
            }}
            className="misproductos__box__button"
            title="Ver promociones vigentes"
          >
            <p>Promociones vigentes</p>
          </div>
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={"800px"}
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
                  disabled={
                    promotion.genre.length !== 0 &&
                    promotion.brand.length !== 0 &&
                    promovalue !== 0
                      ? false
                      : true
                  }
                  onClick={() => {
                    savePromotion({
                      afectedProduct: promotion,
                      discountAmount: promovalue,
                      discountNameId:
                        discountName === ""
                          ? `Promoción #${mockdatapromos.length + 1}`
                          : discountName,
                      replaceExistedPromotion: true,
                    });
                  }}
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
            onChange={(value) =>
              handleChangeSearchParams(value.target.value, "name")
            }
          />
          <SelectComponent
            value={searchparam.brand}
            options={SelectMockDataBrand}
            class_select={"select__mproducts"}
            value_label={"brand"}
            handleChange={handleChangeSearchParams}
          />
          <SelectComponent
            value={searchparam.genre}
            options={SelectMockDataGenre}
            class_select={"select__mproducts"}
            value_label={"genre"}
            handleChange={handleChangeSearchParams}
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
            columns={initialColumns}
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
          <DrawerComponent getData={getData} onClose={onClose} />
        </Drawer>
      </MisProductosContainer>
    </div>
  );
};

export default MisProductos;
