import React, { useState, useEffect } from "react";
import makeToast from "../Toaster";
import axios from "axios";
// import { withRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const loginUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:2080/user/login", {
        email,
        password,
      })
      .then((response) => {
        makeToast("success", response.data.message);
        localStorage.setItem("CC_Token", response.data.token);
        console.log(response.data);
        setIsAuth(true);
        props.setupSocket();
        props.navigate("/dashboard");
      })
      .catch((err) => {
        // console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          makeToast("error", err.response.data.message);
      });
  };

  useEffect(() => {
    console.log(isAuth);
    if (isAuth) navigate("/dashboard");
  }, [isAuth, navigate]);

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button onClick={loginUser}>Login</button>
      </div>
    </div>
  );
};

export default Login;
