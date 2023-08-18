import React, { useState, useEffect } from "react";
import { getProducts } from "@services";
import { Table } from "antd";

const MisProductos: React.FC = () => {
  const [activeprod, setActiveProd] = useState<any>({});
  const [products, setProducts] = useState<any>([]);

  const getData = async () => {
    const req = await getProducts();
    setProducts(req.sneakers);
    console.log(req);
  };

  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "price",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "genre",
      key: "address",
    },
  ];

  return (
    <div>
      <h3>My products</h3>
      <div>
        <Table dataSource={products} columns={columns} />
      </div>
    </div>
  );
};

export default MisProductos;
