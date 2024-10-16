import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAuth,
  fetchUserProfile,
  updateUserProfile,
} from "../redux/userReducer";
import { getTokenCookie } from "../services/token";
import { useNavigate } from "react-router-dom";
import { Account } from "./Account";

export default function User() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //State des inputs
  const [tempFirstname, setTempFirstname] = useState(user.firstname);
  const [tempLastname, setTempLastname] = useState(user.lastname);

  //State qui détermine l'affichage des inputs pour modifié le nom et prénom
  const [isEditing, setIsEditing] = useState(false);

  const listAccount = [
    { title: "Argent Bank Checking (x8349)", amount: 2082.79 },
    { title: "Argent Bank Savings (x6712)", amount: 10928.42 },
    { title: "Argent Bank Credit Card (x8349)", amount: 184.3 },
  ];

  //Note : boucle infini de rendu sans UseEffect
  useEffect(() => {
    var token = getTokenCookie();
    if (user.firstname && user.lastname) {
      token = user.auth;
    } else {
      if (token && !user.firstname) {
        console.log("test token");
        console.log(token);
        dispatch(changeAuth(token));
        dispatch(fetchUserProfile(token));
      } else {
        navigate("/sign-in");
      }
    }
  }, []);

  //Gére sauvegarde du nouveau nom et prénom
  const handleSave = () => {
    dispatch(
      updateUserProfile({
        auth: user.auth,
        profile: { firstName: tempFirstname, lastName: tempLastname },
      })
    );
    setIsEditing(false);
  };

  //Gére l'annulation des modifications
  const handleCancel = () => {
    setTempFirstname(user.firstname); //Reset des valeurs temporaires
    setTempLastname(user.lastname);

    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user.firstname} {user.lastname}!
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

      {listAccount.map((account, index) => {
        return (
          <Account key={index} title={account.title} amount={account.amount} />
        );
      })}
    </main>
  );
}
