import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../components/Paginate";
import Search from "../components/Search";
import Transaction from "../components/Transactions/Transaction";
import { filterType } from "../features/filter/filterSlice";

export default function ViewAll() {
  const [type, setType] = useState("all");
  const [page, setPage] = useState("1");
  const { transactions, isError, isLoading } = useSelector(
    (state) => state.filter
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterType({ type: "all", searchTerm, page: 1, limit: 5 }));
  }, [dispatch, searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage("1");
    dispatch(filterType({ type, searchTerm }));
  };

  const handlePaginate = (e) => {
    dispatch(filterType({ type, page: e.target.name, searchTerm }));
    setPage(e.target.name);
    console.log(searchTerm);
  };

  // decide what to render
  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occurred!</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p>No transactions found!</p>;
  }

  return (
    <>
      <div className="container container_of_list_of_transactions">
        <Search
          searchTerm={searchTerm}
          handleChange={(e) => handleChange(e)}
          handleSubmit={handleSubmit}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <div className="radio_group">
            <input
              id="all"
              required
              type="radio"
              value="all"
              name="type"
              checked={type === "all"}
              onChange={(e) => {
                setType("all");
                dispatch(filterType({ type: "all", searchTerm }));
              }}
            />
            <label htmlFor="all">All</label>
          </div>
          <div className="radio_group">
            <input
              id="income"
              required
              type="radio"
              value="income"
              name="type"
              checked={type === "income"}
              onChange={(e) => {
                setType("income");
                dispatch(filterType({ type: "income", searchTerm }));
              }}
            />
            <label htmlFor="income">Income</label>
          </div>
          <div className="radio_group">
            <input
              id="expense"
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === "expense"}
              onChange={(e) => {
                setType("expense");
                dispatch(filterType({ type: "expense", searchTerm }));
              }}
            />
            <label htmlFor="expense">Expense</label>
          </div>
        </div>
        <ul>{content}</ul>
      </div>
      <Paginate type={type} handlePaginate={(e) => handlePaginate(e)} />
    </>
  );
}
