import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";



const ChatBar = ({ socket }) => {

  const [listeUsers, setListeUsers] = React.useState([]);
  const getlisteUsers = () => {
    axios
      .get("http://localhost:2080/user/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setListeUsers(response.data);
      })
      .catch((err) => {
        setTimeout(getlisteUsers, 3000);
      });
  };

  React.useEffect(() => {
    getlisteUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div class="overflow-auto h-[32rem]">
        <li>
            {listeUsers.map((Users) => (
            <Link to={"/channel/" + Users._id}>
                  <a class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                    <img
                      class="object-cover w-10 h-10 rounded-full"
                      src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                      alt="username"
                    />

                    <div class="w-full pb-2">
                      <div class="flex justify-between">
                        <span class="block ml-2 font-semibold text-gray-600">
                          <div key={Users._id} className="chatroom">
                            <div className="">{Users.name}</div>
                          </div>
                        </span>

                        <span class="block ml-2 text-sm text-gray-600">
                          25 minutes
                        </span>
                      </div>
                      <span class="block ml-2 text-sm text-gray-600">bye</span>
                    </div>
                    </a>
                 </Link>
                   ))}
              </li>
             
        </div>
      </div>
    </div>
  );
};

export default ChatBar;