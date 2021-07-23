import { MerchantsLimits } from "./components/MerchantsLimits";
import { MerchantsTotal } from "./components/MerchantTotal";
import { Turnover } from "./components/Turnover";

export default function AdminDashboard() {
  return (
    <>
      <MerchantsTotal />
      <MerchantsLimits />
      <Turnover />
    </>
  );
}
