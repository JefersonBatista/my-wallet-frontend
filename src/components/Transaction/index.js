import { TransactionItem } from "./style";

export default function Transaction({
  type,
  date,
  description,
  value,
  deleteTransaction,
}) {
  return (
    <TransactionItem>
      <span className="date-and-description">
        <span className="date">{date}</span>
        <span className="description">{description}</span>
      </span>
      <span>
        <span className={type}>
          {value.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="delete" onClick={deleteTransaction}>
          X
        </span>
      </span>
    </TransactionItem>
  );
}
