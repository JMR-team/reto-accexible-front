import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="top">
      <div className="topLeft">
        <span className="topListItem">
            <Link className="link" to="/">
                <img src="https://accexible.com/static/media/accexible_logo.42a306b1.png" alt="logo AcceXible"/>
            </Link>
        </span>
      </div>
      <div className="topCenter">
        <ul className="topList">
        <li className="topListItem">
            <Link className="link" to="/test-ansiedad">
              Iniciar Test
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/login">
              Inicio Sesión
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/signup">
              Registro
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
