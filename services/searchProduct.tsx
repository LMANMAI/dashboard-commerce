import instance from "../config";

const searchProduct = async (param: any) => {
  try {
    const { data } = await instance.get(`/product/search`, { params: param });
    return data;
  } catch (error) {
    return [];
  }
};

export default searchProduct;
