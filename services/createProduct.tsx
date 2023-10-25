import instance from "../config";
interface IPageProps {
  formData: any;
}
const addProducts = async ({ formData }: IPageProps) => {
  try {
    const { data } = await instance.post(`sneaker/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return [];
  }
};

export default addProducts;
