import instance from "../config";

const createPromotion = async ({ promotion }: { promotion: any }) => {
  try {
    const { data } = await instance.post(
      `/promotion/createPromotion`,
      promotion
    );

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default createPromotion;
