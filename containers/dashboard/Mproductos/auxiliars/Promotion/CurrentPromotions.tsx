import React from "react";
import { Card, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ModalCurrentPromotion } from "../../styles";
import { LoadingContainer } from "../../styles";
import { CurrentPromotionsComponentProps, Promotion } from "@types";

const CurrentPromotionsComponent: React.FC<CurrentPromotionsComponentProps> = ({
  mockDataPromos,
  loadPromotions,
  setMockDataPromo,
  deleteCurrentPromotion,
}) => {
  return (
    <ModalCurrentPromotion>
      <h2>Promociones vigentes</h2>
      {mockDataPromos.length > 0 && !loadPromotions ? (
        <div className="current_promotion">
          {mockDataPromos.map((item: Promotion) => (
            <Card
              key={item._id}
              style={{ width: 200 }}
              actions={[
                <DeleteOutlined
                  key="setting"
                  onClick={() => {
                    const updatedPromos = mockDataPromos.filter(
                      (itemfilter: Promotion) => itemfilter._id !== item._id
                    );
                    setMockDataPromo(updatedPromos);
                    deleteCurrentPromotion(item._id, item.afectedProduct);
                  }}
                />,
              ]}
            >
              <Card.Meta title={item.discountNameId} />
              <p>Marca: {item.afectedProduct?.brand}</p>
              <p>Genero: {item.afectedProduct?.genre}</p>
              <p>Descuento del {item.discountAmount}%</p>
            </Card>
          ))}
        </div>
      ) : loadPromotions ? (
        <LoadingContainer>
          <p>Obteniendo información</p>
          <Spin size="large" />
        </LoadingContainer>
      ) : (
        <div>
          <p>
            Todavia no se registran promociones, las mismas se deben agregar
            desde el boton de <strong>Agregar Promoción</strong>
          </p>
        </div>
      )}
    </ModalCurrentPromotion>
  );
};

export default CurrentPromotionsComponent;
