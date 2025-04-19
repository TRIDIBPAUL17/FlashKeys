import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useTheme } from '../Context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ graphData, type }) => {
  const { theme } = useTheme();

  const labels = graphData.map(i =>
    type === 'date' ? i[0].toDate().toLocaleString().split(',')[0] : i[0] + 1
  );

  const data = {
    labels,
    datasets: [
      {
        data: graphData.map(i => i[1]),
        label: 'WPM',
        borderColor: theme.title || '#8a2be2',
        backgroundColor: theme.title || '#8a2be2',
        pointBackgroundColor: '#fff',
        pointBorderColor: theme.title || '#8a2be2',
        borderWidth: 2,
        pointRadius: 5,
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme.title || '#8a2be2'
        }
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: type === 'date' ? 'Date' : 'Test No.',
          color: theme.title || '#8a2be2',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          color: theme.title || '#8a2be2'
        },
        grid: {
          color: '#ddd'
        }
      },
      y: {
        title: {
          display: true,
          text: 'WPM',
          color: theme.title || '#8a2be2',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          color: theme.title || '#8a2be2'
        },
        grid: {
          color: '#eee'
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default Graph;
