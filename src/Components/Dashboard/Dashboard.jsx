import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMerchants } from "../../redux/modules/merchant/actions";
import { AbilityContext, Can } from "../Common/Can";

export default function Dashboard() {
  const dispatch = useDispatch();
  const merchants = useSelector((state) => state.merchant.merchants);
  const ability = useContext(AbilityContext);

  useEffect(() => {
    dispatch(getMerchants());
  }, []);

  const username = useSelector((state) => state.auth.username);
  return (
    <>
      <div>Hello</div>
      <div>{username}</div>
      {merchants.map((m) => {
        return <div> m.guid</div>;
      })}

      <Can I="create" a="Todo">
        <button>NOO</button>
      </Can>
      <Can I="READ" a="MERCHANT">
        <button>YEES</button>
      </Can>

      <Can do="REPORT" on="ORDERDETAIL">
        ...
      </Can>
      {console.log(ability.A)}
      {console.log(ability.can("READ", "MERCHANT"))}
    </>
  );
}
