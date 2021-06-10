import { useMemo } from "react";
import CustomModal from "../../Components/Common/Modal";
import { Button } from "antd";

export default function useShopsColumns(ability) {
  return useMemo(
    () => [
      {
        title: "guid",
        dataIndex: "guid",
        key: "guid",
      },
      {
        title: "name",
        dataIndex: "name",
        key: "name",
      },
    ],
    [ability]
  );
}
