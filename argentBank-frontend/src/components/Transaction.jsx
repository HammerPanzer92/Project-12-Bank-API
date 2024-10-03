import { useState } from "react";

export function Transaction(props) {
  const tabCat = ["Food", "Tools", "Materials"];

  const [category, setCategory] = useState(0);
  const [notes, setNotes] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="transaction">
      <div className="transaction-header">
        <div className="arrow" onClick={(e) =>{ 
            e.target.classList.toggle("active");
            setIsEditing(!isEditing)}}></div>
        <p>{props.date}</p>
        <p>{props.description}</p>
        <p>{props.amount}</p>
        <p>{props.balance}</p>
      </div>
      {isEditing && (
        <div className="transaction-info">
          <p>Transaction Type: Electronic</p>
          <p>Cateogry: {tabCat[category]}</p>
          <div className="pen-icon"></div>
          <p>Notes: {notes}</p>
          <div className="pen-icon"></div>
        </div>
      )}
    </div>
  );
}
