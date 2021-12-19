import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Login.css"

export default function Login(props) {
  // Navigation hook
  let navigate = useNavigate();

  // State hooks
  let [token, setToken] = useState(localStorage.getItem("token"));
  let [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  // Effect hooks
  // When the token is changed to the value returned by the backend, save the token in the local storage and navigate to the user page.
  useEffect(() => {
    if (token != null) {
        localStorage.setItem('token',token);
        navigate('/');
    }
  }, [token]);

  // render components
  return (
    <section className="loginRegisterSection">
      <div className="loginRegisterContainer">  
        <h2>Iniciar Sesión:</h2>
        <div className="loginForm">
          <input className="loginInput"
            value={loginInput.email}
            type="text"
            placeholder="email"
            onChange={(e) =>
              setLoginInput({ ...loginInput, email: e.target.value })
            }
          />
        </div>
        <div className="loginForm">
          <input className="loginInput"
            value={loginInput.password}
            type="password"
            placeholder="password"
            onChange={(e) =>
              setLoginInput({ ...loginInput, password: e.target.value })
            }
          />
        </div>
        <div className="loginForm">
          <button className="loginButton" onClick={login}>Iniciar sesión</button>
        </div>
      </div>
    </section>
  );

  // Functions

  // login to obtain a token for accesing user info
  function login() {
    fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInput),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => {
        // set the token in the state of the page
        setToken(data.token);
      })
      .catch((err) => {
        // console.log(err);
        err.json().then(console.log);
      });
  }
}
