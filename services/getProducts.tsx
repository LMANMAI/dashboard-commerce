import instance from "../config";
interface IPageProps {
  page: number;
  pageSize: number;
}
const getProducts = async ({ page, pageSize }: IPageProps) => {
  try {
    const { data } = await instance.get(
      `sneaker?page=${page}&pageSize=${pageSize}`
    );
    return data;
  } catch (error) {
    return [];
  }
};

export default getProducts;
