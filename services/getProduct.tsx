import instance from "../config";

const getProduct = async (productId: string) => {
  try {
    const { data } = await instance.get(`/${productId}`);
    return data;
  } catch (error) {
    return [];
  }
};

export default getProduct;
