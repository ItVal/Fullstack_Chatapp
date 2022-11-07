import styles from "./styles.module.css";
import { useNavigate } from 'react-router-dom'; //redirection chat page

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate(); //pour rediction

  // fonction de rappel
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    // Redirect to /chat
    navigate('/chat', { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`ValChat app`}</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)} // choix de l'utilisateur
        />

        <select className={styles.input}
        onChange={(e) => setRoom(e.target.value)} >
          <option>-- Select Room --</option>
          <option value='javascript'>JavaScript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>
        <button 
        className="btn btn-secondary" 
        style={{ width: "100%" }}
        onClick={joinRoom}>
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
