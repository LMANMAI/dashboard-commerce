import { useState, useEffect } from "react";
import { getProducts } from "@services";
import { Line } from "react-chartjs-2";
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
    current: 2,
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
      const req = await getProducts({
        page: pagination.current,
        pageSize: pagination.pageSize,
      });

      if (req.status === 200) {
        setPagination({
          current: req.currenPage,
          pageSize: 10,
          total: req.totalSneakers,
        });

        // Process the data to get the count of products per month
        const productsByMonth: { [month: string]: number } = {};
        req.data.forEach((product: any) => {
          const releaseMonth = new Date(product.relaseYear).toLocaleString(
            "en-US",
            { month: "long" }
          );
          console.log(releaseMonth);
          productsByMonth[releaseMonth] =
            (productsByMonth[releaseMonth] || 0) + 1;
        });
        console.log(productsByMonth);
        setProducts({ data: productsByMonth });
      }
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
      <h3>Mis ventas</h3>
      <div>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default MisVentas;
