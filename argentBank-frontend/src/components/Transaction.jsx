import { useState } from "react";

export function Transaction(props) {
  const tabCat = ["Food", "Tools", "Utilities"];

  const [category, setCategory] = useState(0);
  const [notes, setNotes] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  const [isChangingNote, setIsChangingNote] = useState(false);

  return (
    <section className="transaction">
      <div className="transaction-header">
        <div
          className={isEditing ? "arrow clicked" : "arrow"}
          onClick={(e) => {
            e.target.classList.toggle("active");
            setIsEditing(!isEditing);
          }}
        >
          <img src="./img/arrow.svg" alt="Editer les infos" />
        </div>
        <p>{props.date}</p>
        <p>{props.description}</p>
        <p>{props.amount}</p>
        <p>{props.balance}</p>
      </div>
      {isEditing && (
        <div className="transaction-info">
          <p>Transaction Type: Electronic</p>
          <div className="transaction-category">
            <p>Cateogry: {tabCat[category]}</p>
            <div
              className="pen-icon"
              onClick={() => setIsChangingCategory(!isChangingCategory)}
            >
              <img src="./img/pen.svg" alt="Changer la catégorie" />
            </div>
            {isChangingCategory && (
              <select
                className="category-select"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={0} selected>
                  Food
                </option>
                <option value={1}>Tools</option>
                <option value={2}>Utilities</option>
              </select>
            )}
          </div>
          <div className="transaction-notes">
          <p>Notes: {notes}</p>
          <div
            className="pen-icon"
            onClick={() => setIsChangingNote(!isChangingNote)}
          >
            <img src="./img/pen.svg" alt="Changer la note" />
          </div>
          {isChangingNote && (

              <input
                type="text"
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

          )}
          </div>
        </div>
      )}
    </section>
  );
}
