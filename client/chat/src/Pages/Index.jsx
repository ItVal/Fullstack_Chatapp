import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const IndexPage = (props) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    console.log(token);
    if (!token) {
      setIsAuth(true);
      navigate("/login");
    } else {
      setIsAuth(true);
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, [0]);

  useEffect(() => {
    console.log(isAuth);
    if (isAuth) navigate("/dashboard");
    navigate("/login");
  }, [isAuth, navigate]);
  return <div></div>;
};

export default IndexPage;