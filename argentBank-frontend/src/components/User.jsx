import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../redux/userReducer";

export default function User() {
  
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  //State du nom et prénom (temp, seront stocké dans store Redux)
  const [firstname, setFirstname] = useState("firstname");
  const [lastname, setLastname] = useState("lastname");

  //State des inputs
  const [tempFirstname, setTempFirstname] = useState(firstname);
  const [tempLastname, setTempLastname] = useState(lastname);

  //State qui détermine l'affichage des inputs pour modifié le nom et prénom
  const [isEditing, setIsEditing] = useState(false);

  //Gére sauvegarde du nouveau nom et prénom
  const handleSave = () => {
    setFirstname(tempFirstname);
    setLastname(tempLastname);
    dispatch(changeName({firstname: tempFirstname, lastname: tempLastname}));
    console.log(user);
    setIsEditing(false);
  };

  //Gére l'annulation des modifications
  const handleCancel = () => {
    setTempFirstname(firstname);//Reset des valeurs temporaires
    setTempLastname(lastname);
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstname} {lastname}!
        </h1>
        
        {!isEditing && ( //Affichage du btn "edit name" si on n'est pas en mode édition
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        )}
        
        {isEditing && ( //si on est en mode édition alors on affiche les inputs a la place
          <div className="edit-container">
            <div className="input-container">
              <input
                type="text"
                className="form-control"
                id="edit-firstname"
                value={tempFirstname}
                onChange={(e) => setTempFirstname(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                id="edit-lastname"
                value={tempLastname}
                onChange={(e) => setTempLastname(e.target.value)}
              />
            </div>
            <div className="button-container">
              <button className="edit-button" onClick={handleSave}>
                Save
              </button>
              <button className="edit-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}
