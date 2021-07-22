import { Card } from "antd";
import { MerchantsLimits } from "./components/MerchantsLimits";
import { MerchantsTotal } from "./components/MerchantTotal";
import { Turnover } from "./components/Turnover";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <Card title="Merchant total (Turnover)">
        <MerchantsTotal />
      </Card>
      <Card title="Merchant limits">
        <MerchantsLimits />
      </Card>
      <Card title="Turnover">
        <Turnover />
      </Card>
    </div>
  );
}
