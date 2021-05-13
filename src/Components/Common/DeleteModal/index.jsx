import Swal from "sweetalert2";

export default function DeleteModal(handleDelete, guid) {
  Swal.fire({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this. Type reason below.",
    icon: "warning",
    input: "text",
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
    showCancelButton: true,
  }).then((res) => {
    if (res.isConfirmed && res.value) {
      console.log(res.value);
      handleDelete(guid, res.value);
      Swal.fire({
        title: "Deleted",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  });
  // return swal({
  //   title: "Are you sure?",
  //   text: "Once deleted, you will not be able to recover this. Type reason below.",
  //   content: "input",
  //   icon: "warning",
  //   buttons: true,
  //   dangerMode: true,
  // }).then((value) => {
  //   if (value) {
  //     this.handleDelete(item.guid, value);
  //     swal("Deleted", {
  //       icon: "success",
  //       button: false,
  //       timer: 2000,
  //     });
  //   }
  // });
}
