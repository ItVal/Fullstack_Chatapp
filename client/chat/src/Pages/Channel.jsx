import React from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";

const Channel = ({socket}) => {
  const { id } = useParams();
  const chatroomId = id;
  
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState("");

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

  return (
    
    <div>
{/*       
    //   <h1 className="title">To Solola Ba Ndeko</h1>
    // <div className="channel">
    //   <div className="chatroomPage">
    //    <div className="chatroomSection1">
    //     <div className="cardHeader">Users</div>
    //      <div className="chatroomContent">
    //      {listeUsers.map((Users) => (
    //       <div key={Users._id} className="chatroom">
    //         <div className="">{Users.name}
    //      </div>
    //     </div>
    //      ))}
    //      </div>
    //     </div>
    //    </div>

    // <div className="chatroomPage">
    //   <div className="chatroomSection">
    //     <div className="cardHeader">Chat</div>
    //     <div className="chatroomContent">
    //       {messages.map((message, i) => (
    //         <div key={i} className="message">
    //           <span
    //             className={
    //               userId === message.userId ? "ownMessage" : "otherMessage"
    //             }
    //           >
    //             {message.name}:
    //           </span>{" "}
    //           {message.message}
    //         </div>
    //       ))}
    //     </div>
    //     <div className="chatroomActions">
    //       <div>
    //         <input
    //           type="text"
    //           name="message"
    //           placeholder="Say something!"
    //           ref={messageRef}
    //         />
    //       </div>
    //       <div>
    //         <button className="join" onClick={sendMessage}>
    //           Send
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // </div> */}
    </div>
  )
  
};

export default Channel;