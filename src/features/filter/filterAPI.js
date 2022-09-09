import axiosInstance from "../../utils/axios";

export const filterByType = async (type, page = 1, searchTerm, limit = 5) => {
  let queryString = type === "all" ? "" : `type=${type}`;
  queryString += searchTerm ? `&q=${searchTerm}` : "";
  queryString += `&_page=${+page}&_limit=${limit}`;

  console.log(queryString);
  const response = await axiosInstance.get(`/transactions?${queryString}`);

  const totalCount = response.headers["x-total-count"];
  return {
    totalCount,
    data: response.data,
    searchTerm,
  };
};
