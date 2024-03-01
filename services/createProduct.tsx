import instance from "../config";
interface IPageProps {
  formData: any;
}
const addProducts = async ({ formData }: IPageProps) => {
  try {
    const { data } = await instance.post(`/product/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default addProducts;
