// StatsChart.js
import { Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Skeleton } from "@mui/material";

ChartJS.register(
  BarElement, 
  CategoryScale, 
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export default function StatsChart({ data, loading }) {
  const chartData = {
    labels: ["Services", "Users", "Orders", "Providers"],
    datasets: [
      {
        label: "Total Count",
        backgroundColor: [
          'rgba(79, 70, 229, 0.7)',
          'rgba(22, 163, 74, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(220, 38, 38, 0.7)'
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(22, 163, 74, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(220, 38, 38, 1)'
        ],
        borderWidth: 1,
        borderRadius: 6,
        data: [data.products, data.users, data.orders, data.partners],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 12
        },
        padding: 10,
        cornerRadius: 6,
        displayColors: true,
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          stepSize: 5,
          padding: 10
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          padding: 10
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-full h-64 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return <Bar data={chartData} options={options} />;
}