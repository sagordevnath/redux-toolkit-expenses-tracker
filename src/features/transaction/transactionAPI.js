import axios from "../../utils/axios";

export const getTransactions = async (page = 1, limit = 5) => {
  const response = await axios.get(
    `/transactions?_sort=id&_order=desc&_limit=${limit}`
  );

  return response.data;
};

export const addTransaction = async (data) => {
  const response = await axios.post("/transactions", data);

  return response.data;
};

export const editTransaction = async (id, data) => {
  const response = await axios.put(`/transactions/${id}`, data);

  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = axios.delete(`/transactions/${id}`);

  return response.data;
};
