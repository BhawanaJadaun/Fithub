import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AnalyticPage = () => {
  // 🔹 Fake Stats
  const stats = {
    totalGyms: 12,
    totalRequests: 20,
    approved: 10,
    rejected: 5,
    pending: 5,
  };

  // 🔹 Fake Time Series Data
  const chartData = {
    labels: ["2025-05-01", "2025-05-02", "2025-05-03", "2025-05-04", "2025-05-05"],
    datasets: [
      {
        label: "Gym Requests per Day",
        data: [2, 4, 3, 5, 6],
        backgroundColor: [
          "#5F6FFF", // May 1, 2025
          "#FF6F61", // May 2, 2025
          "#6BFF61", // May 3, 2025
          "#FF61D2", // May 4, 2025
          "#FF9E3D", // May 5, 2025
        ],
        borderColor: "black", // Optional, to add borders to bars
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Requests: ${tooltipItem.raw}`; // Customize tooltip label
          },
        },
        titleColor: "#fff", // Tooltip title color
        bodyColor: "#fff",  // Tooltip body color
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff", // X-axis labels color
        },
      },
      y: {
        ticks: {
          color: "#fff", // Y-axis labels (numbers) color set to white
        },
      },
    },
    maintainAspectRatio: false, // Prevent default aspect ratio
  };

  return (
    <div className="px-6 py-6 flex flex-col lg:ml-60 md:ml-0 sm:ml-0 bg-third min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-six">Admin Analytics</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 w-full max-w-6xl mx-auto">
        <StatCard title="Total Gyms" value={stats.totalGyms} className="bg-third" />
        <StatCard title="Total Requests" value={stats.totalRequests} />
        <StatCard title="Approved" value={stats.approved} />
        <StatCard title="Rejected" value={stats.rejected} />
        <StatCard title="Pending" value={stats.pending} />
      </div>

      {/* Chart */}
      <div className="bg-first rounded-xl shadow p-5 max-w-6xl mx-auto h-[300px] sm:h-[400px]" style={{ width: '100%', height: '300px' }}>
        <h3 className="text-lg font-semibold mb-4 text-default">Requests Over Time</h3>
        <Bar data={chartData} options={chartOptions} className="text-default" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-first shadow-md rounded-xl p-5 text-center glow-border">
    <h3 className="text-lg font-semibold text-fourth">{title}</h3>
    <p className="text-xl sm:text-2xl font-bold text-default">{value}</p>
  </div>
);

export default AnalyticPage;
