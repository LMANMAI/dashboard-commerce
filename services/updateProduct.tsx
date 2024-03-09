import instance from "../config";

const updateProduct = async (selectedItem: any) => {
  try {
    const { data } = await instance.put(`/product/update/${selectedItem._id}`, {
      selectedItem,
    });
    return data;
  } catch (error) {
    return [];
  }
};

export default updateProduct;
