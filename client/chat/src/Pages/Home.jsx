import React from 'react'
import homeIMG from "../assets/imgchat-removebg-preview.png"
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import "../Styles/mobile.css";
const Home = () => {
  let navigate = useNavigate(); 
  const loginPage = () =>{ 
    let path = `/login`; 
    navigate(path);
  }


  const registerPage = () =>{ 
    let path = `/register`; 
    navigate(path);
  }
  return (
  <div class>
  {/* <Navbar /> */}
  
  <div className = "homepage ">
    <div className="first "> 
    <h1 className="titre ">To Solola ba<br /> Ndeko ba bolingo <br /> Platform</h1>
    <p className="sousTitre items-left text-left ">Keep the workflow going by centralizing all your tools and touchpoints in one platform. Made for profesional communication (team collaboration and private, DevOps and customer) </p>
    <div className=" flex item-center justify-center gap-4 m-9">
          <button
              onClick={loginPage}
              className="w-full px-8 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#3356b2] rounded-md hover:bg-green-500 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
            <button
                onClick={registerPage}
              className="w-full px-6 py-2 tracking-wide text-[#fe8c1c] transition-colors duration-200 transform bg-[#c9dcfa] rounded-md hover:bg-black focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
    </div>
    </div>
    <div className="second ">
    <h1 className="titres items-left text-left  mb-5 font-bold">To Solola ba<br /> ndeko ba bolingo <br /> platform</h1>
    <img src={homeIMG} alt="image" className="homeimg "/>
    </div>
  </div>
  </div>
  )
}

export default Home;