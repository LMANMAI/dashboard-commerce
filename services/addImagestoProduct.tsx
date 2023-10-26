import instance from "../config";
interface IPageProps {
  productId: string;
  imagesFormData: any;
}
const addImagestoProduct = async ({
  productId,
  imagesFormData,
}: IPageProps) => {
  try {
    const { data } = await instance.post(
      `productimages/${productId}`,
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
