import { Pie } from "react-chartjs-2";

export const HorizontalBar = ({ labels, datasets, options }) => {
  const data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};
