import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/login.css";
import makeToast from "../Toaster";
import { useNavigate } from "react-router-dom";




const Channel = ({ socket }) => {
  const { id } = useParams();
  const chatroomId = id;

  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState("");
  const navigate = useNavigate();

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    }
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
    }
    //eslint-disable-next-line
  }, [messages]);

  React.useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId,
      });
    }
    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
      }
    };
    //eslint-disable-next-line
  }, []);

  // get user
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

  //logout
  const leaveChat = () => {
    localStorage.removeItem("CC_Token", response.data.token);
    navigate('/');
    makeToast("logout success", response.data.message);
    window.location.reload();
  };

  return (
    <div>
  
  <h1 className="title block text-sm font-semibold mt-5 text-gray-800">To Solola Ba Ndeko</h1>
    <div className="chat justify-center mt-10 overflow-x-hidden">
      <div class=" container mx-auto ml-10 mt-10 mb-10 h-screen ">
        <div class="min-w-full border rounded lg:grid lg:grid-cols-3">
          <div class="border-r border-gray-300 lg:col-span-1">
            <div class="mx-3 my-3">
              <div class="relative text-gray-600">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    class="w-6 h-6 text-gray-300"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </span>
                <input
                  type="search"
                  class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                  name="search"
                  placeholder="Search"
                  required
                />
              </div>
            </div>

            <ul class="overflow-auto h-[32rem]">
              <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
              <li>
                {listeUsers.map((Users) => (
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
                    <Link to={"/channel/" + Users._id}></Link>
                  </a>
                ))}
              </li>
            </ul>
          </div>
          <div class="hidden lg:col-span-2 lg:block">
            <div class="w-full">
              <div class="flex items-center justify-between p-3 border-b border-gray-300">
                <div class="relative flex items-center p-3 border-b border-gray-300">
                <img
                  class="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                  alt="username"
                />
                <span class="block ml-2 font-bold text-gray-600">ValNas</span>
                <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                </div>
                <div class="groite">
                  <span class="logout" onClick={leaveChat}>Logout</span>
                </div>
              </div>
              <div class="overflow-auto h-[70vh] bg-white relative w-full p-6 overflow-y-auto ]">
                <ul class="space-y-2">
                  <li class=" w-full ">
                    <div class="relative px-4 py-2 text-gray-700 rounded w-full flex flex-col">
                      {messages.map((message, i) => (
                        <div
                          key={i}
                          className={
                            userId === message.userId
                              ? " self-end"
                              : "self-start"
                          }
                        >
                          <span
                            className={
                              userId === message.userId
                                ? "ownMessage self-start"
                                : "otherMessage self-end"
                            }
                          >
                            {message.name}:
                          </span>
                          {message.message}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>

              <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <button class=" bg-white w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 "
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button class=" bg-white w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>

                <input
                  type="text"
                  placeholder="Message"
                  class="block  flex-1 w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  ref={messageRef}
                  required
                />
                <button class=" bg-white w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </button>
                <button
                  class=" bg-white w-10"
                  type="submit"
                  onClick={sendMessage}
                >
                  <svg
                    class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );

  //     <div>
  // {/*
  //     //   <h1 className="title">To Solola Ba Ndeko</h1>
  //     // <div className="channel">
  //     //   <div className="chatroomPage">
  //     //    <div className="chatroomSection1">
  //     //     <div className="cardHeader">Users</div>
  //     //      <div className="chatroomContent">
  //     //      {listeUsers.map((Users) => (
  //     //       <div key={Users._id} className="chatroom">
  //     //         <div className="">{Users.name}
  //     //      </div>
  //     //     </div>
  //     //      ))}
  //     //      </div>
  //     //     </div>
  //     //    </div>

  //     // <div className="chatroomPage">
  //     //   <div className="chatroomSection">
  //     //     <div className="cardHeader">Chat</div>
  //     //     <div className="chatroomContent">
  //     //       {messages.map((message, i) => (
  //     //         <div key={i} className="message">
  //     //           <span
  //     //             className={
  //     //               userId === message.userId ? "ownMessage" : "otherMessage"
  //     //             }
  //     //           >
  //     //             {message.name}:
  //     //           </span>{" "}
  //     //           {message.message}
  //     //         </div>
  //     //       ))}
  //     //     </div>
  //     //     <div className="chatroomActions">
  //     //       <div>
  //     //         <input
  //     //           type="text"
  //     //           name="message"
  //     //           placeholder="Say something!"
  //     //           ref={messageRef}
  //     //         />
  //     //       </div>
  //     //       <div>
  //     //         <button className="join" onClick={sendMessage}>
  //     //           Send
  //     //         </button>
  //     //       </div>
  //     //     </div>
  //     //   </div>
  //     // </div>

  //     // </div> */}
  //     </div>
  //   )
};

export default Channel;
