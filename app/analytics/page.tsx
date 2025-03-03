"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Card } from "@/components/ui/card";
import { 
  Eye, 
  TrendingUp,
  FileUp,
  Download,
  Users,
  Loader2
} from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Dummy data generator functions
const generateDailyData = () => {
  return Array.from({ length: 7 }, () => Math.floor(Math.random() * 50));
};

const generateMonthlyData = () => {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 200));
};

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUploads: 0,
    totalDownloads: 0,
    totalViews: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats({
        totalUploads: 1234,
        totalDownloads: 5678,
        totalViews: 9012,
        activeUsers: 345,
      });
      setIsLoading(false);
    };
    loadData();
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: 'Uploads',
        data: generateMonthlyData(),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Downloads',
        data: generateMonthlyData(),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const barChartData = {
    labels: days,
    datasets: [
      {
        label: 'File Views',
        data: generateDailyData(),
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Images', 'Documents', 'Videos', 'Others'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(99, 102, 241, 0.5)',
          'rgba(244, 63, 94, 0.5)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(99, 102, 241)',
          'rgb(244, 63, 94)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your file sharing metrics and user engagement
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total Uploads</h3>
            <FileUp className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{stats.totalUploads.toLocaleString()}</p>
          <div className="flex items-center text-sm text-green-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>12% increase</span>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total Downloads</h3>
            <Download className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold">{stats.totalDownloads.toLocaleString()}</p>
          <div className="flex items-center text-sm text-green-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>8% increase</span>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total Views</h3>
            <Eye className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
          <div className="flex items-center text-sm text-green-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>15% increase</span>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
            <Users className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
          <div className="flex items-center text-sm text-green-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>5% increase</span>
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upload & Download Trends</h3>
          <div className="h-[300px]">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Daily File Views</h3>
          <div className="h-[300px]">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">File Type Distribution</h3>
          <div className="h-[300px]">
            <Doughnut data={doughnutChartData} options={chartOptions} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Popular Files</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <FileUp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">document-{i + 1}.pdf</p>
                    <p className="text-xs text-muted-foreground">Uploaded 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" /> {Math.floor(Math.random() * 100)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {Math.floor(Math.random() * 200)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 