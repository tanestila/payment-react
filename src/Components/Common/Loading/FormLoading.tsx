import { ClassicSpinner } from "react-spinners-kit";

type LoadingProps = {
  style?: any;
};

export default function MainLoading(props: LoadingProps) {
  return (
    <div className="loading" style={{ ...props.style }}>
      <ClassicSpinner color="#104A9D" />
    </div>
  );
}
