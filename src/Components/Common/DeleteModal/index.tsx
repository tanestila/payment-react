import { UseMutationResult } from "react-query";
import Swal from "sweetalert2";
import { parseError } from "../../../helpers/parseError";
import ErrorModal from "../ErrorModal";
import SuccessModal from "../SuccessModal";

export const DeleteModal = (
  handleDelete: UseMutationResult<any>,
  props: any
) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this. Type reason below.",
    icon: "warning",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      } else return null;
    },
    showCancelButton: true,
  }).then(async (res) => {
    if (res.isConfirmed && res.value) {
      try {
        await handleDelete.mutateAsync({ ...props, reason: res.value });
        SuccessModal("Entity was deleted");
      } catch (error) {
        ErrorModal(parseError(error));
      }
    }
  });
};
