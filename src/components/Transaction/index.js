import { TransactionItem } from "./style";

export default function Transaction({ type, date, description, value }) {
  return (
    <TransactionItem>
      <span>
        <span className="date">{date}</span>
        <span className="description">{description}</span>
      </span>
      <span className={type}>
        {value.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    </TransactionItem>
  );
}
