import React from "react";

export default function Navigation(){
  return (
    <nav>
      <div className='container'>
        <div className='nav-columns'>
          <div className='nav-column'>
            <div className='nav-label'>Menu</div>
            <ul className='nav-links'>
              <li>
                  Iniciar Test
              </li>
              <li>
                  Iniciar Sesión
              </li>
              <li>
                  Registrarse
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

