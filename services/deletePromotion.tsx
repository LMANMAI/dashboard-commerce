import instance from "../config";

const deletePromotions = async (promotionId: string, afectedProduct: any) => {
  try {
    const { data } = await instance.delete(
      `/promotion/deletePromotion/${promotionId}`,
      afectedProduct
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default deletePromotions;
