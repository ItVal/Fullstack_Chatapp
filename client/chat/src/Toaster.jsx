import Swal from "sweetalert2";
// import { withRouter } from "react-router-dom";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
   
  },
});

const makeToast = (type, msg) => {
  Toast.fire({
    icon: type,
    title: msg,
  });
};

export default  makeToast;