import instance from "../config";

const addImagestoProduct = async ({
  productId,
  imagesFormData,
}: {
  productId: string;
  imagesFormData: any;
}) => {
  try {
    const { data } = await instance.put(
      `product/productimages/${productId}`,
      imagesFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return [];
  }
};

export default addImagestoProduct;
