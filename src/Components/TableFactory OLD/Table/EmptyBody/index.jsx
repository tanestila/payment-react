import { Badge } from "react-bootstrap";

export default function TableEmptyBody() {
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
    >
      <Badge
        pill="true"
        style={{
          fontSize: "1.2vw",
        }}
      >
        There is no data
      </Badge>
    </div>
  );
}
