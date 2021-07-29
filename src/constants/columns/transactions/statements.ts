import React, { useMemo } from "react";
import CustomModal from "../../../Components/Common/Modal";
import { Link } from "react-router-dom";
import { cutGuid } from "../../../helpers/cutGuid";
import { Copy } from "../../../Components/Common/CopyToClipboard";
import { Params } from "../../../views/Transactions/Templates/Params";
import { Params as ProcessingParams } from "../../../views/Transactions/AllTransactions/Params";
import { Button } from "antd";
import moment from "moment";

export default function useTransactionStepsColumns() {
  return useMemo(() => [], []);
}
