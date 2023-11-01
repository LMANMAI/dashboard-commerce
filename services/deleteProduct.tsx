import instance from "../config";
import axios from "axios";

const deleteProduct = async (productId: string) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_URL_EP}/delete/${productId}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default deleteProduct;
