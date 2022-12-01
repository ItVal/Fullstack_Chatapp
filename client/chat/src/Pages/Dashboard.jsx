import React from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const [chatrooms, setChatrooms] = React.useState([]);
  const [listeUsers, setListeUsers] = React.useState([]);
  const getChatrooms = () => {
    axios
      .get(process.env.ROUTEALLCHATROOM, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  React.useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  //get all users
  const getlisteUsers = () => {
    axios
      .get(process.env.ROUTEALLUSERS, {
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
    <div className="card relative flex flex-col justify-center h-auto overflow-scr">
      <div className="text-3xl font-semibold text-center text-purple-700 uppercase">
        Bienvenu
      </div>
      <div className="cardBody">
        <div className="mt-6">
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="ChatterBox Nepal"
          />
        </div>
      </div>
      <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
        Create Chatroom
      </button>
      <div className="liste flex  m-5">
        <div className="chatrooms p-5 mr-5 w-50 bg-neutral-300 rounded-md shadow-xl lg:max-w-xl overflow-auto h-[18rem] flex-1 w-50">
          <p className="text-center text-sm font-semibold text-emerald-500">
            Chatroom Name
          </p>
          {chatrooms.map((chatroom) => (
            <div key={chatroom._id} className="chatroom">
              <div className="labelroom">{chatroom.name}</div>
              <Link to={"/channel/" + chatroom._id}>
                <div className="join">Join</div>
              </Link>
            </div>
          ))}
        </div>

        <div className="chatrooms p-5 bg-neutral-300 rounded-md shadow-xl lg:max-w-xl overflow-auto h-[18rem] flex-1 w-50">
          <p className="text-center text-emerald-500">Private conversation</p>
          {listeUsers.map((user) => (
            <div key={user._id} className="chatroom">
              <div className="labelroom">{user.name}</div>
              <Link to={"/chat/" + user._id}>
                <div className="join1">Go</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
