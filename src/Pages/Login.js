import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
        navigate('/user');
    }
  }, [token]);

  // render components
  return (
    <section className="loginRegisterSection">
      <div className="loginRegisterContainer">
        <h2>Login</h2>
        <div>
          <input
            value={loginInput.email}
            type="text"
            placeholder="email"
            onChange={(e) =>
              setLoginInput({ ...loginInput, email: e.target.value })
            }
          />
        </div>
        <div>
          <input
            value={loginInput.password}
            type="password"
            placeholder="password"
            onChange={(e) =>
              setLoginInput({ ...loginInput, password: e.target.value })
            }
          />
        </div>
        <button onClick={login}>Iniciar sesión</button>
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
