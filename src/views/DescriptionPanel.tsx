import { FC } from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { BsInfoCircle } from "react-icons/bs";
import Panel from "./Panel";

interface DescriptionPanelProps {
  summaryScores: Record<string, number>;
}

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const DescriptionPanel: FC<DescriptionPanelProps> = ({ summaryScores }) => {
  const categories = ["Data", "Training", "Performance and Limitations", "Community Engagement and Further Insights", "Model Detail", "Model Use"];
  const benchmarkScores = [50, 50, 50, 50, 50, 50];

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Scores',
        data: categories.map(category => summaryScores[category] || 0),
        backgroundColor: 'rgba(34, 202, 236, .2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
      },
      {
        label: 'Benchmark',
        data: benchmarkScores,
        backgroundColor: 'rgba(255, 99, 132, .2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        pointLabels: {
          callback: (value: string) => {
            const maxLabelLength = 13;
            if (value.length > maxLabelLength) {
              const words = value.split(' ');
              let line = '';
              const lines: string[] = [];
              for (const word of words) {
                if ((line + word).length > maxLabelLength) {
                  lines.push(line);
                  line = '';
                }
                line += (line ? ' ' : '') + word;
              }
              lines.push(line);
              return lines;
            }
            return value;
          },
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <Panel
      initiallyDeployed
      title={
        <>
          <BsInfoCircle className="text-muted" /> Summary Scores
        </>
      }
    >
      <Radar data={data} options={options} />
    </Panel>
  );
};

export default DescriptionPanel;