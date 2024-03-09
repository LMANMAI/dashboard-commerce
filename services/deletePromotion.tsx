import instance from "../config";

const deletePromotions = async (promotionId: string) => {
  try {
    const { data } = await instance.delete(
      `/promotion/deletePromotion/${promotionId}`
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default deletePromotions;
