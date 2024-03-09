import React, { useContext } from "react";
import { Card } from "antd";
import { FunctionsAgregarContext } from "../../../../../context/functionsAgregrarProductosContext";

const AgregarProductoPasoTres: React.FC = () => {
  const { product, imgProduct } = useContext(FunctionsAgregarContext);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        className="card__product_add"
        style={{ width: 275 }}
        cover={<img alt="example" src={imgProduct.thumbUrl} />}
        title={product.name}
      >
        <p>Precio: ${product.price}</p>
        <p>Marca: {product.brand}</p>
        <p>Genero: {product.genre}</p>
      </Card>
    </div>
  );
};

export default AgregarProductoPasoTres;
