export const formatNumber = (number: number) => {
  const hasDecimals = number % 1 !== 0;
  const formattedNumber = hasDecimals
    ? number.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : number.toLocaleString("en-US");

  return formattedNumber;
};
export const formatDate = (dateString: string) => {
  if (!dateString) {
    return "Fecha no disponible";
  }
  const date = new Date(dateString);
  const isISODate = dateString.includes("T");
  const year = isISODate ? date.getUTCFullYear() : date.getFullYear();
  const month = String(
    isISODate ? date.getUTCMonth() + 1 : date.getMonth() + 1
  ).padStart(2, "0");
  const day = String(isISODate ? date.getUTCDate() : date.getDate()).padStart(
    2,
    "0"
  );

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

// export const columns = [
//   {
//     title: "Ver",
//     dataIndex: "",
//     key: "name",
//     render: (_: string, record: IProduct) => (
//       <Button
//         onClick={() => {
//           showDrawer(record);
//         }}
//         icon={<SearchOutlined />}
//       ></Button>
//     ),
//   },
//   {
//     title: "Nombre",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Precio",
//     dataIndex: "price",
//     key: "price",
//     render: (salary: any) => <span>{`$ ${formatNumber(salary)}`}</span>,
//   },
//   {
//     title: "Genero",
//     dataIndex: "genre",
//     key: "genre",
//   },
//   {
//     title: "Cantidad total",
//     dataIndex: "quantity",
//     key: "quantity",
//   },
//   {
//     title: "Fecha de lanzamiento",
//     dataIndex: "releaseYear",
//     key: "releaseYear",
//     render: (date: any) => <span>{`${formatDate(date)}`}</span>,
//   },
//   {
//     title: "Marca",
//     dataIndex: "brand",
//     key: "brand",
//   },
// ];
