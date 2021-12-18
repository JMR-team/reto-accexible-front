import React, { useEffect, useState } from "react";
import { ReactComponent as UpArrow } from "../assets/up-arrow-circle.svg";
import { openMenu, closeMenu } from "../animations/menuAnimations";

export default function Header ({ history, dimensions }){
  const [menuState, setMenuState] = useState({ menuOpened: false });
  useEffect(() => {
    history.listen(() => {
      setMenuState({ menuOpened: false });
    });
    if (menuState.menuOpened === true) {
      openMenu(dimensions.width);
    } else if (menuState.menuOpened === false) {
      closeMenu();
    }
  });

  return (
    <div className='header'>
      <div className='container'>
        <div className='row v-center space-between'>
          <div className='logo'>
            <a href="">
                <img src="https://accexible.com/static/media/accexible_logo.42a306b1.png" />
            </a>
          </div>
          <div className='nav-toggle'>
            <div
              onClick={() => setMenuState({ menuOpened: true })}
              className='hamburger-menu'>
              <span></span>
              <span></span>
            </div>
            <div
              className='hamburger-menu-close'
              onClick={() => setMenuState({ menuOpened: false })}>
              <UpArrow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

