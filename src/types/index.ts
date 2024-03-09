import { Dayjs } from "dayjs";

declare global {
  interface Window {
    my_modal_1: any;
  }
}

export interface IMenu {
  menustatus: boolean;
}

export interface Promotion {
  _id: string;
  discountNameId: string;
  discountAmount: number;
  afectedProduct?: {
    brand: string;
    genre: string;
  };
}
export interface IProduct {
  key?: string;
  name: string;
  price: number;
  imgs: [];
  _id: string;
  posterPathImage: string;
  sizes: IStock[];
  genre: string;
  brand: string;
  releaseYear: Dayjs | string;
  quantity: number;
}

export interface CurrentPromotionsComponentProps {
  mockDataPromos: Promotion[];
  loadPromotions: boolean;
  setMockDataPromo: React.Dispatch<React.SetStateAction<Promotion[]>>;
  deleteCurrentPromotion: (id: string) => void;
}

export interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (arg0: string, arg1: any) => JSX.Element;
  responsive?: any;
}

export interface SearchParams {
  brand?: string;
  genre?: string;
}
export interface FunctionsContextValue {
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
  discountName: string;
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
  handleChangePromotionsDTO: (fieldName: string, event: string) => void;
  handleChangeEditMode: (value: any, fieldName: string) => void;
  onChange: (checked: boolean) => void;
  showModal: (type: number) => void;
  handleOk: () => void;
  handleCancel: () => void;
  setParametersPromotions: (item: any) => void;
  setDiscountName: (name: string) => void;
}

export interface FunctionsAgregarContextValue {
  currentStep: number;
  inputValue: string;
  sizevalue: string;
  load: boolean;
  imgsToProduct: any[];
  imgProduct: any;
  product: IProduct | any;
  resetForm: () => void;
  handleChangeSizeStock: (value: string) => void;
  handleSizeInputChange: (value: string) => void;
  handleDeleteStock: (index: number) => void;
  handleChange: (fieldName: string, value: any) => void;
  handleSaveStock: () => void;
  setCurrentStep: (value: any) => void;
  setLoad: (value: boolean) => void;
  setProduct: (value: any) => void;
  setImgProduct: (value: any) => void;
  setImgsListToProduct: (value: any) => void;
}

export interface IPropsInputComponent {
  name: string;
  classType: string;
  type: string;
  placeholder: string;
  handleChangeFunction: any;
}

export interface ISelect {
  value: string;
  options: any;
  class_select: string;
  value_label: string;
  handleChange: Function;
}

export interface IStock {
  qty: any;
  size: any;
}
