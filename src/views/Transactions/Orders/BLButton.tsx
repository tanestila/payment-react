import { Button } from "antd";
import Swal from "sweetalert2";

export default function BLButton({ value, name, type, merchant_guid }) {
  const onClick = async () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: `Save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      }
    });
    // swal({
    //   title: "Are you sure?",
    //   text: "This can only be deleted in the Blacklist rules.",
    //   icon: "warning",
    //   buttons: true,
    //   dangerMode: true,
    // }).then(async (confirmValue) => {
    //   if (confirmValue)
    //     try {
    // let response = await dispatch(
    //   addBlackListItemAction({
    //     name,
    //     type,
    //     description: `${name} created from order`,
    //     values: [value],
    //   })
    // );
    // await dispatch(
    //   createItemMerchantsBlackListAction({
    //     blacklist_rule_guid: response.guid,
    //     merchant_guid,
    //     type,
    //   })
    // );
    //   swal({
    //     title: "Record is created",
    //     icon: "success",
    //     button: false,
    //     timer: 2000,
    //   });
    // } catch (error) {
    //   console.log(error);
    // const parsedError = parseResponse(error);
    // Alert({
    //   type: "error",
    //   message:
    //     parsedError.message + " \n Check this rule in blacklist rules",
    // });
    // }
    // });
  };
  return (
    <Button onClick={onClick} variant="outline-primary" className="btn-table">
      Add to black list
    </Button>
  );
}
