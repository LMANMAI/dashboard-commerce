import instance from "../config";

const deleteProduct = async (productId: string) => {
  try {
    const { data } = await instance.delete(`/product/delete/${productId}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default deleteProduct;
