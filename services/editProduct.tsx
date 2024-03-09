import instance from "../config";

const editProduct = async (product: any) => {
  try {
    const { data } = await instance.put(
      `/product/update/${product._id}`,
      product
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default editProduct;
