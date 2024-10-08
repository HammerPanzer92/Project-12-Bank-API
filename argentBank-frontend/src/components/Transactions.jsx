import { useLocation } from "react-router-dom";
import { Transaction } from "./Transaction";

export function Transactions() {
  const location = useLocation();
  const title = location.state.title;

  var balance = location.state.balance;
  const listTransactions = [
    { amount: 5 },
    { amount: 10 },
    { amount: 20 },
    { amount: 30 },
    { amount: 40 },
    { amount: 50 },
  ];

  return (
    <main className="main bg-dark transactions-main">
      <header className="header">
        <p>{title}</p>
        <h2>${location.state.balance}</h2>
        <p>Available Balance</p>
      </header>
      <div className="transactions-container">
        <div className="transaction-list">
          {listTransactions.map((transaction, index) => {
            balance += transaction.amount;

            return (
              <Transaction
                key={index}
                date={"June 20th, 2020"}
                description={"Golden Sun Bakery"}
                amount={transaction.amount}
                balance={balance}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
