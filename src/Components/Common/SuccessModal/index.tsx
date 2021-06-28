import Swal from "sweetalert2";

export const SuccessModal = (title: string, text?: string) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "success",
    timer: 2000,
  });
};
