import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import * as EmailValidator from "email-validator";

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
  let [submitButtonIsActive, setSubmitButtonIsActive] = useState(false);
  let [emailInputCorrect,setEmailInputCorrect] = useState(true);
  let [loginFailed,setLoginFailed] = useState(false);

  // Effect hooks

  // When the token is changed to the value returned by the backend, save the token in the local storage and navigate to the user page.
  useEffect(() => {
    if (token != null) {
        localStorage.setItem('token',token);
        navigate('/');
    }
  }, [token]);

  // Effect hook that will listen to changes in the form data
  useEffect(()=>{
    setSubmitButtonIsActive(validateForm())
  },[loginInput])

  // render components
  return (
    <section className="loginRegisterSection">
      <div className="loginRegisterContainer">  
        <h2>Iniciar Sesión:</h2>
        <div className="loginForm">
          <input className="loginInput"
            value={loginInput.email}
            type="text"
            placeholder="correo electrónico"
            onChange={(e) =>{
              emailInputCheck(e);
              setLoginInput({ ...loginInput, email: e.target.value });
            }}
          />
          {emailInputCorrect ? null : <p className="emailError"><small>Formato de correo electrónico incorrecto</small></p>}
        </div>
        <div className="loginForm">
          <input className="loginInput"
            value={loginInput.password}
            type="password"
            placeholder="contraseña"
            onChange={(e) =>
              setLoginInput({ ...loginInput, password: e.target.value })
            }
          />
          <p><small></small></p>
        </div>
        <div className="loginForm">
          <button className="loginButton" type="button" disabled={!submitButtonIsActive} onClick={login}>Iniciar sesión</button>
        </div>
        {loginFailed ? <p className="emailError"><small>Email y/o contraseña incorrectos!</small></p> : null}
      </div>
    </section>
  );

  // Functions

  // login to obtain a token for accesing user info
  function login() {
    fetch(process.env.REACT_APP_API_URL+"/auth/login", {
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
        setLoginFailed(true);
      });
  }

  // Function to check the email format
  function emailInputCheck(event) {
    let email = event.target.value;
    setEmailInputCorrect( EmailValidator.validate(email) )
  }

  // Validate the form data
  function validateForm() {
    return (
      EmailValidator.validate(loginInput.email) &&
      loginInput.password.length > 0
    )
  }
}
