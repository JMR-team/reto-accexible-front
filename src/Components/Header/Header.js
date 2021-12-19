import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <>
      <div className="header">
        <img className="headerImg"
            src="https://i.pinimg.com/736x/f3/64/78/f36478c81a18be460d5c007d99c24b06.jpg"
            alt="imagen del Header"
        />
      </div>
      <div className = "containerHeader" >
        {/* <h1 className = "titleHeader">Salud Mental Accesible Para Todos</h1> */}
          <br/>
          <div className = "containerButton">
            <Link className="link" to="/test-ansiedad">
              <button className = "buttonHeader">
              Iniciar Test
              </button>
            </Link>
          </div>
        </div>
     
    </>
  );
}