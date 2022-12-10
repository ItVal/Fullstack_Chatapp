import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from 'react-toastify';
import logo from "../assets/Chat_Me__1_-removebg-preview.png"

// import makeToast from "../Toaster";

const Register = (props) => {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);

  const registerUser = (props) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post(import.meta.env.VITE_ROUTEREGISTER, {
        name,
        email,
        password,
      })
      .then((response) => {
        // makeToast("success", response.data.message);
        toast.success(response.data.message)
        setIsAuth(true);
        props.navigate("/login");
      })
      .catch((err) => {
        // console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        )
          // makeToast("error", err.response.data.message);
          toast.error(err.response.data.message)
      });
  };

  useEffect(() => {
    console.log(isAuth);
    if (isAuth) navigate("/login");
  }, [isAuth, navigate]);


  const loginPage = () =>{ 
    let path = `/login`; 
    navigate(path);
  }

  return (
    <div className="register">
      <div className="logo2">
      <img src={logo} alt="logo" />
      </div>
    <div className="login relative flex flex-col justify-center mt-0 h-screen ">
      <div className="contR w-full p-3 ml-auto mr-auto bg-[#494949] rounded-md shadow-xl lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-white uppercase">
          Sign up
        </h1>
        <form  className="mt-6 myfor">
        <div className="mb-2">
            <label
             htmlFor="name"
              className="block text-sm font-semibold text-[#40e66a]"
            >
              Name
            </label>
            <input
              type="email"
              className="block w-[90%] px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="email"
              placeholder="ex : ValNas"
              ref={nameRef}
            />
          </div>
          <div className="mb-2">
            <label
             htmlFor="email"
             className="block text-sm font-semibold text-[#40e66a]"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-[90%] px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="email"
              placeholder="abc@gmail.com"
              ref={emailRef}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-[#40e66a]"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-[90%] px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id=""
              placeholder="Your Password"
              ref={passwordRef}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-[#40e66a]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="block w-[90%] px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id=""
              placeholder="Your Password"
              ref={passwordRef}
            />
          </div>
          <div className="mt-6">
            <button
              onClick={registerUser}
              className="w-[90%] px-4 py-2 tracking-wide text-purple-600 font-bold bg-white transition-colors duration-200 transform rounded-md hover:bg-[#40e66a] focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-5 text-xs font-light text-center text-[#40e66a]">
          {" "}
          Already rester?{" "}
          <a 
          
          href="#" 
          className="font-medium text-white hover:underline"
          onClick={loginPage}
          
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
    </div>
 
  );
    
};



export default Register;