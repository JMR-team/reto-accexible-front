import React, { useState , useEffect} from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { MenuList } from "./MenuList";
import "./NavBar.css";

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

  const menuList = MenuList.filter(({showAlways})=>showAlways || !userIsLogged).map(({ url, title }, index) => {
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
            src="https://accexible.com/static/media/accexible_logo.42a306b1.png"
            alt="logo AcceXible"
          />
        </Link>
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "menu-list" : "menu-list close"}>
        {menuList}
        {userIsLogged ? <button onClick={logout}>cerrar sesión</button> : null}
      </ul>
    </nav>
  );
};

