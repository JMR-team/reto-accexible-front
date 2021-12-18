import React from "react";
import { ReactComponent as RightArrow } from "../assets/arrow-right.svg";

export default function Banner (){
  return (
    <section className='main'>
      <div className='container'>
        <div className='row'>
          <h2>
            <div className='line'>
              <span>Salud Mental Accesible</span>
            </div>
            <div className='line'>
              <span>Para Todos.</span>
            </div>
          </h2>
          <div className='btn-row'>
            <a href='/'>
              Iniciar Test <RightArrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

