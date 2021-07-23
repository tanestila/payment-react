import { Bar } from "react-chartjs-2";

export const HorizontalBar = ({
  labels,
  datasets,
  options,
  width,
  height = 300,
}) => {
  const data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div>
      <Bar
        data={data}
        options={{ maintainAspectRatio: false, ...options }}
        width={width}
        height={height}
      />
    </div>
  );
};
