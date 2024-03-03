import instance from "../config";

const removeProductImage = async (
  productId: string,
  imageId: string,
  type: string
) => {
  try {
    const { data } = await instance.put(
      `/product/deleteproductimage/${productId}/${imageId}/${type}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default removeProductImage;
