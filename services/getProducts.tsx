import instance from "../config";

const getProducts = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  try {
    const { data } = await instance.get(
      `product/?page=${page}&pageSize=${pageSize}`
    );
    return data;
  } catch (error) {
    return [];
  }
};

export default getProducts;
