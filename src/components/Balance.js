import { useSelector } from "react-redux";

export default function Balance() {
  const { transactions } = useSelector((state) => state.transaction);
  const totalBalance =
    transactions.length > 0 &&
    transactions.reduce((total, curr) => {
      curr.type === "income"
        ? (total += +curr?.amount)
        : (total -= +curr?.amount);

      return total;
    }, 0);

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>
        <span>{totalBalance || 0}</span>
      </h3>
    </div>
  );
}
