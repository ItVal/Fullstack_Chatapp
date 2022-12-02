import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from 'react-toastify';
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
      .post("http://localhost:2080/user/register", {
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

  return (
    <div className="login">
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-[#3356b2] rounded-md shadow-xl lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-white uppercase">
          Sign up
        </h1>
        <form  className="mt-6">
        <div className="mb-2">
            <label
             htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="email"
              placeholder="ex : ValNas"
              ref={nameRef}
            />
          </div>
          <div className="mb-2">
            <label
             htmlFor="email"
             className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id="email"
              placeholder="abc@gmail.com"
              ref={emailRef}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id=""
              placeholder="Your Password"
              ref={passwordRef}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              id=""
              placeholder="Your Password"
              ref={passwordRef}
            />
          </div>
          <div className="mt-6">
            <button
              onClick={registerUser}
              className="w-full px-4 py-2 tracking-wide text-purple-600 font-bold bg-white transition-colors duration-200 transform rounded-md hover:bg-[#40e66a] focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-black">
          {" "}
          Already rester?{" "}
          <a 
          
          href="/login" 
          className="font-medium text-white hover:underline"
          
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