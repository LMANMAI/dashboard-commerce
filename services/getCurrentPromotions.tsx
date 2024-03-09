import instance from "../config";

const getCurrentPromotions = async () => {
  try {
    const { data } = await instance.get(`/promotion/getPromotions`);
    return data;
  } catch (error) {
    return [];
  }
};

export default getCurrentPromotions;
