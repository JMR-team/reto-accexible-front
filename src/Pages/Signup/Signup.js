import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import * as EmailValidator from "email-validator";

import "./Signup.css";

export default function Signup(props) {
  // Navigation hook
  let navigate = useNavigate();

  // State hooks
  let [token, setToken] = useState(localStorage.getItem("token"));
  let [signUpInput, setSignUpInput] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  let [submitButtonIsActive, setSubmitButtonIsActive] = useState(false);
  let [emailInputCorrect, setEmailInputCorrect] = useState(true);
  let [signupFailed, setSignupFailed] = useState(false);

  // Effect hooks

  // When the token is changed to the value returned by the backend, save the token in the local storage and navigate to the user page.
  useEffect(() => {
    if (token != null) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [token, navigate]);

  // Effect hook that will listen to changes in the form data
  useEffect(() => {
    setSubmitButtonIsActive(validateForm());
  }, [signUpInput]); // eslint-disable-line

  // Render components
  return (
    <section className="signRegisterSection">
      <div className="signRegisterContainer">
        <h2>Registrar nuevo usuario:</h2>
        {/* Nombre y apellidos */}
        <div className="signForm">
          <input
            className="signInput"
            value={signUpInput.firstName}
            type="text"
            placeholder="Nombre"
            onChange={(e) =>
              setSignUpInput({ ...signUpInput, firstName: e.target.value })
            }
          />
        </div>
        <div className="signForm">
          <input
            className="signInput"
            value={signUpInput.lastName}
            type="text"
            placeholder="Apellidos"
            onChange={(e) =>
              setSignUpInput({ ...signUpInput, lastName: e.target.value })
            }
          />
        </div>
        {/* Email */}
        <div className="signForm">
          <input
            className="signInput"
            value={signUpInput.email}
            type="email"
            placeholder="Correo electrónico"
            onChange={(e) => {
              setSignUpInput({ ...signUpInput, email: e.target.value });
              emailInputCheck(e);
            }}
          />
          {emailInputCorrect ? null : (
            <p className="emailError">
              <small>Formato de correo electrónico incorrecto</small>
            </p>
          )}
        </div>
        {/* password */}
        <div className="signForm">
          <input
            className="signInput"
            value={signUpInput.password}
            type="password"
            placeholder="contraseña"
            onChange={(e) =>
              setSignUpInput({ ...signUpInput, password: e.target.value })
            }
          />
        </div>
        <div className="signForm">
          <button
            type="button"
            className="signButton"
            disabled={!submitButtonIsActive}
            onClick={register}
          >
            Registro
          </button>
        </div>
        {signupFailed ? (
          <p className="emailError">
            <small>
              La dirección de correo ya está siendo usada por otro usuario.
            </small>
          </p>
        ) : null}
      </div>
    </section>
  );

  // Functions

  // Register and login to obtain a token for accesing user info
  function register() {
    fetch((process.env.REACT_APP_API_URL ?? "") + "/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpInput),
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
      .catch((response) => {
        setSignupFailed(true);
      });
  }

  // Function to check the email format
  function emailInputCheck(event) {
    let email = event.target.value;
    setEmailInputCorrect(EmailValidator.validate(email));
  }

  // Validate the form data
  function validateForm() {
    return (
      EmailValidator.validate(signUpInput.email) &&
      signUpInput.password.length > 0 &&
      signUpInput.firstName.length > 0 &&
      signUpInput.lastName.length > 0
    );
  }
}
