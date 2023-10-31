import instance from "../config";

const deleteProduct = async (productId: string) => {
  try {
    const { data } = await instance.delete(`/delete/${productId}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default deleteProduct;
