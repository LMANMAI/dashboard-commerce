interface IStock {
  qty: any;
  size: any;
}
export interface IProduct {
  key: string;
  name: string;
  price: number;
  imgs: [];
  _id: string;
  posterPathImage: string;
  sizes: IStock[];
  genre: string;
  brand: string;
}

export const SelectMockDataGenre = [
  { value: "", label: "Elige un genero" },
  { value: "MEN", label: "Hombre" },
  { value: "WOMAN", label: "Mujer" },
  { value: "UNISEX", label: "Unisex" },
];
export const SelectMockDataSize = [
  { value: "", label: "Elige un Tamaño" },
  { value: "5", label: "5" },
  { value: "5.5", label: "5.5" },
  { value: "6", label: "6" },
  { value: "6.5", label: "6.5" },
  { value: "7", label: "7" },
  { value: "7.5", label: "7.5" },
  { value: "8", label: "8" },
  { value: "8.5", label: "8.5" },
  { value: "9", label: "9" },
  { value: "9.5", label: "9.5" },
  { value: "10", label: "10" },
  { value: "10.5", label: "10.5" },
  { value: "11", label: "11" },
  { value: "11.5", label: "11.5" },
  { value: "12", label: "12" },
];
export const SelectMockDataBrand = [
  { label: "Elige una marca", value: "" },
  { label: "Adidas", value: "ADIDAS" },
  { label: "Nike", value: "NIKE" },
  { label: "New Balance", value: "NEW BALANCE" },
  { label: "Air Jordan", value: "AIR JORDAN" },
  { label: "Yeezy", value: "YEEZY" },
  { label: "Converse", value: "CONVERSE" },
  { label: "Vans", value: "VANS" },
  { label: "Revengexstorm", value: "REVENGEXSTORM" },
];
