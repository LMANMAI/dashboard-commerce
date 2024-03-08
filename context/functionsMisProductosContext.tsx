import React, { createContext, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface IProduct {
  key?: string;
  name: string;
  price: number;
  imgs: [];
  _id: string;
  posterPathImage: string;
  sizes: any[];
  genre: string;
  brand: string;
  releaseYear?: string;
}

interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (arg0: string, arg1: any) => JSX.Element;
}

interface SearchParams {
  brand?: string;
  genre?: string;
}
interface FunctionsContextValue {
  initialColumns: Column[];
  products: IProduct[];
  load: boolean;
  selectedItem: IProduct;
  promotion: any;
  selectedItemPoster: string;
  editmode: boolean;
  isModalOpen: boolean;
  mockdatapromos: any[];
  searchparam: {
    name: string;
    genre: string;
    brand: string;
  };
  pagination: any;
  open: boolean;
  promovalue: number | any;
  currentContent: number;

  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<IProduct | null>>;
  setSelectedItemPoster: React.Dispatch<React.SetStateAction<string>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMockDataPromo: React.Dispatch<React.SetStateAction<any[]>>;
  setSearchParam: React.Dispatch<
    React.SetStateAction<{
      name: string;
      genre: string;
      brand: string;
    }>
  >;
  setPagination: React.Dispatch<React.SetStateAction<any>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPromoValue: React.Dispatch<React.SetStateAction<number | any>>;
  setCurrentContent: React.Dispatch<React.SetStateAction<number>>;
  formatNumber: (number: number) => string;
  formatDate: (dateString: string) => string;
  showDrawer: (item: IProduct) => void;
  handleChange: (value: any, fieldName: string) => void;
  handleChangePromotionsDTO: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleChangeEditMode: (value: any, fieldName: string) => void;
  onChange: (checked: boolean) => void;
  showModal: (type: number) => void;
  handleOk: () => void;
  handleCancel: () => void;
}

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
  handleChange: () => {},
  handleChangePromotionsDTO: () => {},
  handleChangeEditMode: () => {},
  onChange: () => {},
  showModal: () => {},
  handleOk: () => {},
  handleCancel: () => {},
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
      key: "name",
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
    },
    {
      title: "Genero",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Cantidad total",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Fecha de lanzamiento",
      dataIndex: "releaseYear",
      key: "releaseYear",
      render: (date: any) => <span>{`${formatDate(date)}`}</span>,
    },
    {
      title: "Marca",
      dataIndex: "brand",
      key: "brand",
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
  const [promovalue, setPromoValue] = useState<number | any>();
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
    console.log("desde el drawer en el context", item);
    setOpen(true);
    setSelectedItem(item);
    setSelectedItemPoster(
      `https://res.cloudinary.com/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/upload/v1697492964/${item.posterPathImage}`
    );
  };

  const handleChange = (value: any, fieldName: string) => {
    setSearchParam((prevSearchParam) => ({
      ...prevSearchParam,
      [fieldName]: value,
    }));
  };
  const handleChangePromotionsDTO = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value, name } = event.target;
    setParametersPromotions((prevSearchParam: SearchParams) => ({
      ...prevSearchParam,
      [name]: value,
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
    handleChange: handleChange,
    handleChangePromotionsDTO: handleChangePromotionsDTO,
    handleChangeEditMode: handleChangeEditMode,
    onChange: onChange,
    showModal: showModal,
    handleOk: handleOk,
    handleCancel: handleCancel,
  };

  return (
    <FunctionsContext.Provider value={value}>
      {children}
    </FunctionsContext.Provider>
  );
};
