import { Line } from "react-chartjs-2";

export const PieChart = ({ labels, datasets, options }) => {
  const data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};
