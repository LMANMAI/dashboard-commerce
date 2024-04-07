import instance from "../config";

const getPurchaseOrders = async () => {
  try {
    const { data } = await instance.get(`checkout/dashboard/getAllOrders`);
    return data;
  } catch (error) {
    return [];
  }
};

export default getPurchaseOrders;
