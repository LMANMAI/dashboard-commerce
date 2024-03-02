import React from "react";
import { Card } from "antd";

interface Props {
  product: any;
  productImg: any;
}

const AgregarProductoPasoTres: React.FC<Props> = ({ product, productImg }) => {
  console.log(product, "product");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        className="card__product_add"
        style={{ width: 275 }}
        cover={<img alt="example" src={productImg.thumbUrl} />}
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
