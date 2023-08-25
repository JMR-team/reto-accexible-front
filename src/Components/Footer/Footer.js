import './Footer.css';
import AccexibleLogo from '../../assets/images/accexible-logo.png'

export default function Footer() {
    return (
        <>
        <div className="footer">
        <div className="containerFooter">
            <div className="box">
                <figure>
                    <img
                        src={AccexibleLogo}
                        alt="logo AcceXible"
                    />
                </figure>
            </div>
            <div className="box">
                <h2>Barcelona</h2>
                <p>Barcelona Tech City</p>
                <p>Plaça de Pau Vila, 1 Bloc A, Planta 3, Porta 3A1, 08003</p>
            </div>
            <div class="box">
                <h2>Bilbao</h2>
                <p>INNOLAB Bilbao</p>
                <p>Gordoniz 44, 48002</p>
            </div>
            <div className="box">
                <h2>Contacta Con Nosotros</h2>
                <div className="social">
                    <a href="https://twitter.com/accexible" target="_blank" className="fab fa-twitter"></a>
                    <a href="https://www.linkedin.com/company/accexible/?originalSubdomain=es" target="_blank" className="fab fa-linkedin-in"></a>
                </div>
            </div>
        </div>
        <div className="containerInfoFooter">
            <small>&copy; 2021 <b>Code4Jobs</b> - Reto De Empresa AcceXible.</small>
        </div>
    </div>
    </>
    );
}

