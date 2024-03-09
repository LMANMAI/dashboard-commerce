import { useState, useEffect } from "react";
import { getProducts } from "@services";
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

  useEffect(() => {
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

    fetchData();
  }, [pagination.current, pagination.pageSize]);

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

  return (
    <div>
      <HeaderTittle>Mis ventas</HeaderTittle>
      <GraphicContainer>
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
      </GraphicContainer>
    </div>
  );
};

export default MisVentas;
