import { Link } from "react-router-dom";

export function Account(props) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{props.title}</h3>
        <p className="account-amount">${props.amount}</p>
        <p className="account-amount-description">Available Balance</p>
      </div>
      <div className="account-content-wrapper cta">
        <Link
          to="/transactions"
          state={{ title: props.title, balance: props.amount }}
        >
          <button className="transaction-button">View transactions</button>
        </Link>
      </div>
    </section>
  );
}
