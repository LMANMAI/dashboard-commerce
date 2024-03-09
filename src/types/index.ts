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
