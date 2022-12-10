import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChatPage = ({ socket, props }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  const { id } = useParams();
  const idReceiver = id;

  const [privatemessages, setPrivateMessages] = useState([]);
  const [recever, setRecever] = useState(undefined);
  const [recevername, setRecevername] = useState(undefined);
  const messageRef = React.useRef();
  const [contact, setContact] = useState("");
  // const [myprivateMsg, setMyprivateMsg] = useState([]);

  const lastMessageRef = useRef(null);

  // filterPrivateMessage whitout socket
  async function filterPrivateMessage(friend) {
    const req = await axios.post(import.meta.env.VITE_ROUTEONEMESSAGE + id, {
      friend: friend,
    });
    setContact(friend);
    setPrivateMessages(req.data);
  }
  // console.log(import.meta.env.VITE_ROUTEONEMESSAGE)

  const sendPMessage = () => {
    if (socket) {
      socket.emit("privateMessage", {
        idReceiver: recever,
        message: messageRef.current.value,
      });

      messageRef.current.value = "";
    }
  };

  useEffect(() => {
    socket.on("newMessageSent", ({ idReceiver }) => {
      if (idReceiver.toString() == recever.toString())
        filterPrivateMessage(idReceiver);
    });
  }, [socket]);

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    console.log("je suis dans useeffect");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
      console.log(payload.id);
    }
    if (socket) {
      socket.on("newPMessage", (message) => {
        const newPMessage = [...privatemessages, message];
        setPrivateMessages(newPMessage);
        console.log("message envoyé");
      });
    }
    console.log(privatemessages);
    //eslint-disable-next-line
  });

  console.log(privatemessages);
  React.useEffect(() => {
    if (socket) {
      socket.emit("joinChat", {
        idReceiver,
      });
    }
    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveChat", {
          idReceiver,
        });
      }
    };
    //eslint-disable-next-line
  }, []);

  // //get all messages
  // // get user
  // const [listchat, setListchat] = React.useState([]);
  // const getlisteMessages = () => {
  //   axios
  //     .get(import.meta.env.VITE_ROUTEALLMESSAGES, {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("CC_Token"),
  //       },
  //     })
  //     .then((response) => {
  //       setListchat(response.data);
  //     })
  //     .catch((err) => {
  //       setTimeout(getlisteMessages, 3000);
  //     });
  // };

  // React.useEffect(() => {
  //   getlisteMessages();
  //   // eslint-disable-next-line
  // }, []);

  // get user
  const [listeUsers, setListeUsers] = React.useState([]);
  const getlisteUsers = () => {
    axios
      .get(import.meta.env.VITE_ROUTEALLUSERSMOINSUN + id, {
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

  const changeChat = (id, name) => {
    setRecever(id);
    setRecevername(name);
  };

  //logout
  const leaveChat = () => {
    localStorage.removeItem("CC_Token", userId);
    localStorage.removeItem("user", JSON.stringify(userId));
    navigate("/login");
    toast.success(response.data.message);
    window.location.reload();
  };

  return (
    <div className="chat justify-center mt-10 overflow-y-hidden">
      <div class=" container mx-auto ml-10 mt-10 mb-10 h-screen ">
        <div class="min-w-full border rounded lg:grid lg:grid-cols-3">
          <div class="border-r border-gray-300 lg:col-span-1">
            <div class="md:container md:mx-auto my-1">
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

            <ul class="overflow-auto h-[32rem] imgBckgside md:container md:mx-auto ">
              <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
              <li>
                {listeUsers.map((Users) => (
                  <a
                    key={Users._id}
                    onClick={() => {
                      filterPrivateMessage(Users._id);
                      changeChat(Users._id, Users.name);
                    }}
                    class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-[#d0e8c4] focus:outline-none"
                  >
                    <img
                      class="object-cover w-10 h-10 rounded-full"
                      src="http://www.medqualityassurance.org/views/images/default_user.png"
                      alt="username"
                    />

                    <div class="w-full pb-2">
                      <div class="flex justify-between">
                        <span class="block ml-2 font-semibold text-gray-600">
                          <div className="chatroom">
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
                  <span class="block ml-2 font-bold text-[#202124]">
                    {recevername}
                  </span>
                  <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                </div>
                <div class="groite">
                  <img
                    class="object-cover w-10 h-10 rounded-full"
                    src="https://icons.veryicon.com/png/o/miscellaneous/jiankangxian/logout-43.png"
                    alt="username"
                    onClick={leaveChat}
                  />
                </div>
              </div>
              <div class="imgBckg imgBckgside overflow-auto h-[70vh] bg-white relative w-full p-6 overflow-y-auto ]">
                <ul class="space-y-2">
                  <li class=" w-full ">
                    <div class="relative px-4 py-2 rounded w-full flex flex-col">
                      {privatemessages.map((message, i) => (
                        <div
                          key={i}
                          className={`rounded p-2   my-1 
                            ${
                              userId != message.idReceiver
                                ? "ownMessage self-end bg-[#d0e8c4] text-[#202124]"
                                : "otherMessage self-start bg-[#202124] text-white"
                            }`}
                        >
                          <span
                            className={
                              recever === message.idReceiver
                                ? " ownMessage self-start "
                                : " otherMessage self-end bg"
                            }
                          >
                            {/* {message.name} */}
                          </span>
                          {message.message}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>

              <div class="flex items-center justify-between w-full p-3 border-t bg-white border-gray-600">
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
                <button class=" bg-[#fdfdfd] w-10">
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
                  class="block  flex-1 w-full py-2 pl-4 mx-3 border-[#d0e8c4] border-2 border-solid rounded-full focus:outline-none focus:text-gray-700"
                  name="message"
                  ref={messageRef}
                  required
                />
                {/* <button class=" bg-white w-10">
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
                </button> */}
                <button class=" w-10" type="submit" onClick={sendPMessage}>
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
  );
};

export default ChatPage;
