// client/src/socket.js
import { io } from "socket.io-client";

const URL = "http://localhost:2080";
const socket = io(URL, {
  path: "/socket.io",
  reconnection: false,
});
export default socket;