/* eslint-disable no-underscore-dangle */
import { Ability } from "@casl/ability";
import store from "../../redux/store";

const ability = new Ability([]);

let currentAuth;
store.subscribe(() => {
  console.log("UPDATE PRIV");
  const prevAuth = currentAuth;
  currentAuth = store.getState().auth.permissions;
  if (prevAuth !== currentAuth) {
    ability.update(defineRulesFor(currentAuth));
  }
});
//["READ_CHARGEPERIODICDETAIL
function defineRulesFor(permissions) {
  return permissions.map((permission) => {
    let [action, subject] = permission.split("_");
    return { action, subject };
  });
}

export default ability;
