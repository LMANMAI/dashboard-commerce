import React, { createContext, useState } from "react";
import dayjs from "dayjs";
import { IProduct } from "@containers/dashboard/Mproductos/statics";

interface FunctionsAgregarContextValue {
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

export const FunctionsAgregarContext =
  createContext<FunctionsAgregarContextValue>({
    currentStep: 0,
    inputValue: "",
    sizevalue: "",
    load: false,
    imgsToProduct: [],
    imgProduct: null,
    product: {
      sizes: [],
      name: "",
      releaseYear: dayjs(),
      price: 0,
      brand: "",
      genre: "",
      quantity: 0,
    },
    resetForm: () => {},
    handleChangeSizeStock: () => {},
    handleSizeInputChange: () => {},
    handleDeleteStock: () => {},
    handleChange: () => {},
    handleSaveStock: () => {},
    setCurrentStep: () => {},
    setLoad: () => {},
    setProduct: () => {},
    setImgProduct: () => {},
    setImgsListToProduct: () => {},
  });

export const FunctionsAgregarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [sizevalue, setSizevalue] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [imgsToProduct, setImgsListToProduct] = useState<any>([]);
  const [imgProduct, setImgProduct] = useState<any>();
  const [product, setProduct] = useState<any>({
    sizes: [],
    name: "",
    releaseYear: dayjs(),
    price: 0,
    brand: "",
    genre: "",
    quantity: 0,
  });

  //Onchanges
  const resetForm = () => {
    setImgProduct(null);
    setImgsListToProduct([]);
    setCurrentStep(0);
    setLoad(false);
    setProduct({
      sizes: [],
      name: "",
      releaseYear: dayjs(),
      price: 0,
      brand: "",
      genre: "",
      quantity: 0,
    });
  };
  const handleChangeSizeStock = (value: string) => {
    setSizevalue(value);
  };
  const handleSizeInputChange = (value: string) => {
    setInputValue(value);
  };
  const handleDeleteStock = (index: number) => {
    const updatedSizes = product.sizes.filter(
      (_: any, itemIndex: any) => itemIndex !== index
    );
    setProduct({ ...product, sizes: updatedSizes });
  };
  const handleChange = (fieldName: string, value: any) => {
    setProduct({ ...product, [fieldName]: value });
  };
  const handleSaveStock = () => {
    const newSize = {
      size: sizevalue,
      qty: inputValue,
    };
    const prevStock: { size: string; qty: string }[] = product.sizes;
    const existingSizeIndex = prevStock.findIndex(
      (item) => item.size === sizevalue
    );
    if (existingSizeIndex !== -1) {
      prevStock[existingSizeIndex].qty = (
        parseInt(prevStock[existingSizeIndex].qty) + parseInt(inputValue)
      ).toString();
    } else {
      prevStock.push(newSize);
    }
    setProduct({
      ...product,
      sizes: prevStock,
    });
    setSizevalue("");
    setInputValue("");
  };

  const value: FunctionsAgregarContextValue = {
    currentStep,
    inputValue,
    sizevalue,
    load,
    imgsToProduct,
    imgProduct,
    product,
    resetForm,
    handleChangeSizeStock,
    handleSizeInputChange,
    handleDeleteStock,
    handleChange,
    handleSaveStock,
    setCurrentStep,
    setLoad,
    setProduct,
    setImgProduct,
    setImgsListToProduct,
  };

  return (
    <FunctionsAgregarContext.Provider value={value}>
      {children}
    </FunctionsAgregarContext.Provider>
  );
};
