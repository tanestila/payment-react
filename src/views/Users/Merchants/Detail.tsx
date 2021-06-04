import { useParams } from "react-router-dom";

export default function MerchantDetail() {
  let history = useParams();
  console.log(history);

  return <div>merchant detail</div>;
}
