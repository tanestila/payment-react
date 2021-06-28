import { Bar } from "react-chartjs-2";

export const HorizontalBar = ({ labels, datasets, options }) => {
  const data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};
