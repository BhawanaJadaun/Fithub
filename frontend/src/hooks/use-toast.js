import { toast as showToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toast = ({ title, description }) => {
  showToast(`${title} - ${description}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};
