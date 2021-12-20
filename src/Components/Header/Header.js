import { Link } from "react-router-dom";
import Services from '../Services/Services';
import "./Header.css";
import reto from '../ChatTest/assets/logotipo.bbk.svg';
import bootcamp from '../ChatTest/assets/logocode4jobs.svg';

export default function Header() {
  return (
    <>
      <div className="header">
        <img className="headerImg"
            src="https://images-ext-2.discordapp.net/external/gUyG6SbaJrMWT5_P1TQuNvFpXzibV569HqBRvW4HRBA/https/i.imgur.com/IGWfqHIh.jpg"
            alt="imagen del Header"
        />
      </div>
      <div className = "containerHeader" >
        <h1 className = "titleHeader">Salud Mental Accesible Para Todos</h1>
          <br/>
          <div className = "containerButton">
            <Link className="link" to="/test-ansiedad">
              <button className = "buttonHeader">
              Iniciar Test
              </button>
            </Link>
          </div>
        </div>
        <div className="services-container">
            <Services  image={reto} title={'RETO BBK BOOTCAMP'} 
            text={'Sistema de prueba para la detección de síntomas depresivos, cuadros de ansiedad e indicativos de necesidad de atención psicológica.'}
            />
            <Services  image={bootcamp} title={'EQUIPO BREATHE'} 
            text={'En el reto hemos participado las siguientes personas: Joseba Garcia, Miguel y Roque Carrillo (editar esto ahora)'}
            />
        </div>
    </>
  );
}
