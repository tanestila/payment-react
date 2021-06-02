import { useQuery } from "react-query";
import { gatewayAPI } from "../../../../services/queries/management/gateway";

export default function useGateways() {
  const { data } = useQuery(["gateways"], gatewayAPI.getGateways, {
    // enabled: !!userId,
  });
  return data;
}
