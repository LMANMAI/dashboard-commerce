import instance from "../config";
interface IPageProps {
  promotion: any;
}
const createPromotion = async ({ promotion }: IPageProps) => {
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
