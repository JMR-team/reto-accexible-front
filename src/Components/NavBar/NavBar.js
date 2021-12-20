import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { MenuList } from "./MenuList";
import "./NavBar.css";

export default function Navbar (){
  const [clicked, setClicked] = useState(false);
  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink exact to={url} activeClassName="active">
          {title}
        </NavLink>
      </li>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav>
      <div className="logo">
        <Link className="link" to="/">
          <img src="https://accexible.com/static/media/accexible_logo.42a306b1.png" alt="logo AcceXible"/>
        </Link>
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "menu-list" : "menu-list close"}>{menuList}</ul>
    </nav>
  );
};

