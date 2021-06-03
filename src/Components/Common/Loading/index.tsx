import { ClassicSpinner } from "react-spinners-kit";

type LoadingProps = {
  style?: any;
};

export default function Loading(props: LoadingProps) {
  return (
    <div className="loading" style={{ marginTop: "10%", ...props.style }}>
      <ClassicSpinner color="#104A9D" />
    </div>
  );
}
