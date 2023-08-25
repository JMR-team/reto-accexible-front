import React, { useState , useEffect} from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { MenuList } from "./MenuList";
import "./NavBar.css";
import AccesibleLogo from "../../assets/images/accexible-logo.png";

export default function Navbar (){
  const navigate = useNavigate();
  const [userIsLogged,setUserIsLogged] = useState( localStorage.getItem('token') !=null )
  const [clicked, setClicked] = useState(false);
  

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      setUserIsLogged(false);
    } else {
      setUserIsLogged(true);
    }
  }, [localStorage.getItem("token")]);


  const handleClick = () => {
    setClicked(!clicked);
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  const menuList = MenuList.filter(
    ({showAlways,showOnlyForLogged}) => showAlways || (userIsLogged && showOnlyForLogged) || (!userIsLogged && !showOnlyForLogged)
    ).map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink onClick={handleClick} exact to={url} activeClassName="active">
          {title}
        </NavLink>
      </li>
    );
  });

  return (
    <nav>
      <div className="logo">
        <Link className="link" to="/">
          <img
            src={AccesibleLogo}
            alt="logo AcceXible"
          />
        </Link>
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "menu-list" : "menu-list close"}>
        {menuList}
        {userIsLogged ? <button className="closeButton" onClick={logout}></button> : null}
      </ul>
    </nav>
  );
};

