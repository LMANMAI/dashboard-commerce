import instance from "../config";

const getProducts = async () => {
  try {
    const { data, status } = await instance("/sneaker");

    console.log("req", data);
    return data;
  } catch (error) {
    return [];
  }
};

export default getProducts;
