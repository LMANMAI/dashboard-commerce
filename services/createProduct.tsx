import instance from "../config";

const addProducts = async ({ formData }: { formData: any }) => {
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
