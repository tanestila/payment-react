import Swal from "sweetalert2";

const ErrorModal = ({ title, text }) => {
  Swal.fire({
    title: title,
    text: text || "",
    icon: "error",
    // timer: 2000,
  });
};
export default ErrorModal;
