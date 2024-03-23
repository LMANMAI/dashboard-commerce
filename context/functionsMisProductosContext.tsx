import React, { createContext, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Column, FunctionsContextValue, IProduct, SearchParams } from "@types";

export const FunctionsContext = createContext<FunctionsContextValue>({
  initialColumns: [],
  products: [],
  load: false,
  selectedItem: {
    name: "",
    price: 0,
    imgs: [],
    _id: "",
    posterPathImage: "",
    sizes: [],
    genre: "",
    brand: "",
    releaseYear: "",
    quantity: 0,
  },
  promotion: {},
  selectedItemPoster: "",
  editmode: false,
  isModalOpen: false,
  mockdatapromos: [],
  searchparam: {
    name: "",
    genre: "",
    brand: "",
  },
  pagination: {
    current: 1,
    pageSize: 10,
    total: 10,
  },
  open: false,
  promovalue: undefined,
  currentContent: 0,
  discountName: "",
  setProducts: () => {},
  setLoad: () => {},
  setSelectedItem: () => {},
  setSelectedItemPoster: () => {},
  setEditMode: () => {},
  setIsModalOpen: () => {},
  setMockDataPromo: () => {},
  setSearchParam: () => {},
  setPagination: () => {},
  setOpen: () => {},
  setPromoValue: () => {},
  setCurrentContent: () => {},
  formatNumber: () => "",
  formatDate: () => "",
  showDrawer: () => {},
  handleChangeSearchParams: () => {},
  handleChangeselectedItem: () => {},
  handleChangePromotionsDTO: () => {},
  handleChangeEditMode: () => {},
  onChange: () => {},
  showModal: () => {},
  handleOk: () => {},
  handleCancel: () => {},
  setParametersPromotions: () => {},
  setDiscountName: () => {},
});

export const FunctionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialColumns: Column[] = [
    {
      title: "Ver",
      dataIndex: "",
      key: "ver",
      render: (_: string, record: IProduct) => (
        <Button
          onClick={() => {
            showDrawer(record);
          }}
          icon={<SearchOutlined />}
        ></Button>
      ),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
      render: (salary: any) => <span>{`$ ${formatNumber(salary)}`}</span>,
      responsive: ["lg"],
    },
    {
      title: "Genero",
      dataIndex: "genre",
      key: "genre",
      responsive: ["lg"],
    },
    {
      title: "Cantidad total",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["md"],
    },
    {
      title: "Fecha de lanzamiento",
      dataIndex: "releaseYear",
      key: "releaseYear",
      render: (date: any) => <span>{`${formatDate(date)}`}</span>,
      responsive: ["md"],
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
      responsive: ["md"],
    },
  ];
  const [products, setProducts] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IProduct | any>(null);
  const [promotion, setParametersPromotions] = useState<IProduct | any>({
    brand: "",
    genre: "",
  });
  const [selectedItemPoster, setSelectedItemPoster] = useState<string>("");
  const [editmode, setEditMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mockdatapromos, setMockDataPromo] = useState<any>([]);
  const [searchparam, setSearchParam] = useState({
    name: "",
    genre: "",
    brand: "",
  });
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    total: 10,
  });
  const [open, setOpen] = useState(false);
  const [promovalue, setPromoValue] = useState<number>(0);
  const [discountName, setDiscountName] = useState<string>("");
  const [currentContent, setCurrentContent] = useState(1);
  const formatNumber = (number: number) => {
    const hasDecimals = number % 1 !== 0;
    const formattedNumber = hasDecimals
      ? number.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : number.toLocaleString("en-US");

    return formattedNumber;
  };
  const formatDate = (dateString: string) => {
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

  const showDrawer = (item: any) => {
    setOpen(true);
    setSelectedItem(item);
    setSelectedItemPoster(
      `https://res.cloudinary.com/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/upload/v1697492964/${item.posterPathImage}`
    );
  };

  const handleChangeSearchParams = (value: any, fieldName: string) => {
    console.log(fieldName, "fieldName");
    console.log(value, "value");
    setSearchParam((prevSearchParam) => ({
      ...prevSearchParam,
      [fieldName]: value,
    }));
  };
  const handleChangeselectedItem = (value: any, fieldName: string) => {
    setSelectedItem((selectedItem: any) => ({
      ...selectedItem,
      [fieldName]: value,
    }));
  };
  const handleChangePromotionsDTO = (fieldName: string, event: string) => {
    setParametersPromotions((prevSearchParam: SearchParams) => ({
      ...prevSearchParam,
      [fieldName]: event,
    }));
  };
  const handleChangeEditMode = (value: any, fieldName: string) => {
    setSelectedItem({
      ...selectedItem,
      [fieldName]: value,
    });
  };

  const onChange = (checked: boolean) => {
    setEditMode(checked);
  };
  const showModal = (type: number) => {
    setIsModalOpen(true);
    setCurrentContent(type);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const value: FunctionsContextValue = {
    initialColumns: initialColumns,
    products: products,
    load: load,
    selectedItem: selectedItem,
    promotion: promotion,
    selectedItemPoster: selectedItemPoster,
    editmode: editmode,
    isModalOpen: isModalOpen,
    mockdatapromos: mockdatapromos,
    searchparam: searchparam,
    pagination: pagination,
    open: open,
    promovalue: promovalue,
    currentContent: currentContent,
    discountName,
    setProducts: setProducts,
    setLoad: setLoad,
    setSelectedItem: setSelectedItem,
    setSelectedItemPoster: setSelectedItemPoster,
    setEditMode: setEditMode,
    setIsModalOpen: setIsModalOpen,
    setMockDataPromo: setMockDataPromo,
    setSearchParam: setSearchParam,
    setPagination: setPagination,
    setOpen: setOpen,
    setPromoValue: setPromoValue,
    setCurrentContent: setCurrentContent,
    formatNumber: formatNumber,
    formatDate: formatDate,
    showDrawer: showDrawer,
    handleChangeSearchParams: handleChangeSearchParams,
    handleChangeselectedItem,
    handleChangePromotionsDTO: handleChangePromotionsDTO,
    handleChangeEditMode: handleChangeEditMode,
    onChange: onChange,
    showModal: showModal,
    handleOk: handleOk,
    handleCancel: handleCancel,
    setParametersPromotions: setParametersPromotions,
    setDiscountName,
  };

  return (
    <FunctionsContext.Provider value={value}>
      {children}
    </FunctionsContext.Provider>
  );
};
