import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Signup(props) {
  // Navigation hook
  let navigate = useNavigate();

  // State hooks
  let [token, setToken] = useState(localStorage.getItem("token"));
  let [submitIsActive, setSubmitIsActive] = useState(false);
  let [signUpInput, setSignUpInput] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  // Effect hooks
  // When the token is changed to the value returned by the backend, save the token in the local storage and navigate to the user page.
  useEffect(() => {
    if (token != null) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [token]);

  // Render components
  return (
    <section className="loginRegisterSection">
      <div className="loginRegisterContainer">
        <h2>Registrar nuevo usuario</h2>
        {/* Nombre y apellidos */}
        <div>
          <input
            value={signUpInput.firstName}
            type="text"
            placeholder="Nombre"
            onChange={(e) =>
              setSignUpInput({ ...signUpInput, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <input
            value={signUpInput.lastName}
            type="text"
            placeholder="Apellidos"
            onChange={(e) =>
              setSignUpInput({ ...signUpInput, lastName: e.target.value })
            }
          />
        </div>
        {/* Email */}
        <div>
          <input
            value={signUpInput.email}
            type="email"
            placeholder="Correo electrónico"
            onChange={(e) =>
              setSignUpInput({ ...signUpInput, email: e.target.value })
            }
          />
        </div>
        {/* password */}
        <div>
          <input
            value={signUpInput.password}
            type="password"
            placeholder="password"
            onChange={(e) =>
              setSignUpInput({ ...signUpInput, password: e.target.value })
            }
          />
        </div>
        <button onClick={register}>Registro</button>
      </div>
    </section>
  );

  // Functions

  // login to obtain a token for accesing user info
  function register() {
    fetch("/auth/signup", {
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
      .catch((err) => {
        // console.log(err);
        err.json().then(console.log);
      });
  }
}
