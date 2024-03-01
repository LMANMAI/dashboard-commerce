import React from "react";
import { Button } from "antd";

interface Props {
  product: any;
  handlePrevStep: () => void;
}

const AgregarProductoPasoTres: React.FC<Props> = ({
  product,
  handlePrevStep,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        className="card__product_add"
        style={{ width: 275 }}
        cover={<img alt="example" src={file.thumbUrl} />}
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
