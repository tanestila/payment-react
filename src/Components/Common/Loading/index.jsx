import { ClassicSpinner } from "react-spinners-kit";

export default function Loading(props) {
  return (
    <div style={props.style} className="loading">
      <ClassicSpinner color="#104A9D" />
    </div>
  );
}
