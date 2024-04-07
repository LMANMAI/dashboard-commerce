import { useState, useEffect } from "react";
import { getProducts, getPurchaseOrders } from "@services";
import { Line } from "react-chartjs-2";
import { GraphicContainer, HeaderTittle } from "./styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Card, Col, Row, Tag } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const MisVentas = () => {
  const [products, setProducts] = useState<any>({ data: [] });
  const [orders, setOrders] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 123,
  });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Cantidad de productos ingresados por mes",
      },
    },
  };
  const fetchData = async () => {
    let currentPage = 1;
    let allProducts: { [month: string]: number } = {};
    let req;

    do {
      req = await getProducts({
        page: currentPage,
        pageSize: pagination.pageSize,
      });

      if (req.status === 200) {
        const productsByMonth: { [month: string]: number } = {};
        req.data.forEach((product: any) => {
          const releaseMonth = new Date(product.releaseYear).toLocaleString(
            "en-US",
            { month: "long" }
          );

          productsByMonth[releaseMonth] =
            (productsByMonth[releaseMonth] || 0) + 1;
        });
        allProducts = { ...allProducts, ...productsByMonth };
        setPagination({
          current: req.currenPage,
          pageSize: 10,
          total: req.totalSneakers,
        });
        currentPage++;
      }
    } while (currentPage <= req.totalPages);

    setProducts({ data: allProducts });
  };
  const handlePurchaseOrders = async () => {
    const res = await getPurchaseOrders();
    if (res.status === 200) {
      setOrders(res.orders);
    } else {
      setOrders([]);
    }
    console.log(res);
  };

  useEffect(() => {
    fetchData();
    handlePurchaseOrders();
  }, []);
  const data = {
    labels: Object.keys(products.data),
    datasets: [
      {
        fill: true,
        label: "Cantidad de productos",
        data: Object.values(products.data),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const handleGetTotalPurchase = (products: any) => {
    const totalReducer = (accumulator: any, currentValue: any) =>
      accumulator + currentValue.unit_price;
    const total = products.reduce(totalReducer, 0);
    return total.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };
  return (
    <div>
      <HeaderTittle>Mis ventas</HeaderTittle>
      <GraphicContainer>
        <div className="chart_container">
          <div
            className="graphic graphic_line"
            title="Grafico de productos ingresados por mes"
          >
            <Line options={options} data={data} />
          </div>
          <div
            className="graphic graphic_line"
            title="Grafico de productos vendidos por mes"
          >
            <Line options={options} data={data} />
          </div>
          <div className="graphic graphic_line" title="Grafico de ventas">
            <Line options={options} data={data} />
          </div>
        </div>
        <div
          style={{
            width: "90%",
            margin: "10px",
            overflowY: "auto",
            height: "calc(100dvh - 245px)",
            overflowX: "hidden",
            paddingRight: "10px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Ordenes</h3>
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "5px 0px",
              justifyContent: "center",
            }}
          >
            <Row gutter={16}>
              {orders.map((order: any) => {
                return (
                  <Col
                    xs={24}
                    sm={12}
                    lg={8}
                    span={8}
                    style={{ margin: "5px 0px" }}
                  >
                    <Card title={`Pedido #${order.orderId}`} bordered={false}>
                      <div
                        style={{ display: "flex", gap: "5px", width: "100%" }}
                      >
                        {order.items.map((product: any) => {
                          return (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ width: "100px", height: "100px" }}>
                                <img
                                  src={product.picture_url}
                                  alt={product.title}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span style={{ fontSize: "13px" }}>
                                  {product.title}
                                </span>
                                <span style={{ fontSize: "12px" }}>
                                  unidades: {product.quantity}
                                </span>
                                <p style={{ fontSize: "12px" }}>
                                  valor:{" "}
                                  {product.unit_price.toLocaleString("es-AR", {
                                    style: "currency",
                                    currency: "ARS",
                                  })}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <p>
                        Total:{" "}
                        <Tag color="green">
                          {handleGetTotalPurchase(order.items)}
                        </Tag>
                      </p>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </GraphicContainer>
    </div>
  );
};

export default MisVentas;
