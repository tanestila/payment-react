import Swal from "sweetalert2";

export const ErrorModal = (title: string, text?: string) => {
  Swal.fire({
    title: title,
    text: text || "",
    icon: "success",
    timer: 2000,
  });
};
