import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteTokenCookie } from "../services/token";
import { cleanState } from "../redux/userReducer";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deconnect = () => {
    deleteTokenCookie();
    dispatch(cleanState());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link to="/">
        <div className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </div>
      </Link>
      {!user.auth && (
        <div>
          <Link to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      )}
      {user.auth && (
        <div class="button-nav">
          <div className="profil" onClick={() => navigate("/user")}>
            <img className="profil-icon" src="./img/profil.png" alt="Profil" />
            <p>{user.firstname}</p>
          </div>
          <div className="sign-out" onClick={() => deconnect()}>
            <img
              className="sign-out-icon"
              src="./img/logout.svg"
              alt="Sign Out"
            />
            <p>Sign out</p>
          </div>
        </div>
      )}
    </nav>
  );
}
