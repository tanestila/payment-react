import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function InputLoading(props) {
  return (
    <div className="loading" style={{ ...props.style }}>
      <Spin size="small" />
    </div>
  );
}
