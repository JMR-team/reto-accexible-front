import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Login(params) {
    
    // Navigation hook
    let navigate = useNavigate();

    // State hooks
    let [loginInput,setLoginInput] = useState(
        {
            username:'',
            password:''
        }
    );
    
    // render components
    return(
        <section className="loginRegisterSection">
          <div className="loginRegisterContainer">
            <h2>Login</h2>
            <div>
              <input value={loginInput.username} type="text" placeholder="username"
                onChange={e=>setLoginInput({...loginInput,username:e.target.value})}
              />
            </div>
            <div>
              <input value={loginInput.password} type="password" placeholder="password"
                onChange={e=>setLoginInput({...loginInput,password:e.target.value})}
              />
            </div>
            <button onClick={login}>
              Log in
            </button>
          </div>
        </section>
    )

    // Functions
    function login(){
        // make a fetch request to obtain the token for authorization
        fetch(
        '/auth/login',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(loginInput)
        }
        ).then(r=>{
          if (r.ok) {
            return r.json()
          } else {
            throw r;
          }
        })
        .then(data=>{
          localStorage.setItem('token',data.token);
          navigate('/dashboard');
          // Add the token to the local storage and navigate to the dashboard
        })
        .catch( err=>{
          console.log(err);
          err.json().then(console.log);
        })
    }
}