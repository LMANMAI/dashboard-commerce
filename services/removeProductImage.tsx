import instance from "../config";

const removeProductImage = async (
  productId: string,
  imageId: string,
  type: string
) => {
  try {
    const { data } = await instance.put(
      `/deleteproductimage/${productId}/${imageId}/${type}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default removeProductImage;
