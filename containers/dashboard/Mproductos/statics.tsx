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
