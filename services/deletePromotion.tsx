import instance from "../config";

const deletePromotions = async (promotionId: string, affectedProduct: any) => {
  try {
    const { data } = await instance.delete(
      `/promotion/deletePromotion/${promotionId}`,
      { data: { affectedProduct } }
    );
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default deletePromotions;
