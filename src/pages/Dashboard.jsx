import { useState, useEffect, useCallback } from "react";
import { BarChart2, Bell, Mail, Upload, Download, Clock } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopNavigation from "../components/TopNavigation";
import LoadingSpinner from "../components/LoadingSpinner";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    newUsers: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState("7days"); // Bộ lọc thời gian mặc định là 7 ngày

  // Fetch current user
  const fetchCurrentUser = useCallback(async () => {
    try {
      const userLocal = JSON.parse(localStorage.getItem("user"));
      if (!userLocal || !userLocal._id) throw new Error("No user found");
      const response = await axiosInstance.get(`api/users/${userLocal._id}`);
      setCurrentUser(response.data);
    } catch (err) {
      console.error("Failed to fetch current user:", err.message);
      setCurrentUser({
        fullName: "Admin User",
        email: "admin@example.com",
        avatar: "",
      });
    }
  }, []);

  // Fetch dashboard data based on time filter
  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = { timeFilter }; // Truyền bộ lọc thời gian vào API
      const [statsResponse, activityResponse, notificationsResponse] =
        await Promise.all([
          axiosInstance.get("api/users/stats", { params }),
          axiosInstance.get("api/users/recent-activity", { params }),
          axiosInstance.get("api/notifications", { params }), // API mới cho thông báo
        ]);

      setStats(statsResponse.data);
      setRecentActivity(activityResponse.data);
      setNotifications(notificationsResponse.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err.message);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, [timeFilter]);

  useEffect(() => {
    fetchCurrentUser();
    fetchDashboardData();
  }, [fetchCurrentUser, fetchDashboardData]);

  // Chart options and data
  const barChartOptions = {
    chart: { id: "users-growth-chart" },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    colors: ["#4CAF50"],
    title: { text: "New Users This Week", align: "center" },
  };
  const barChartSeries = [
    { name: "New Users", data: [5, 10, 8, 15, 12, 20, 18] },
  ];

  const lineChartOptions = {
    chart: { id: "active-users-chart" },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    colors: ["#2196F3"],
    title: { text: "Active Users This Week", align: "center" },
    stroke: { curve: "smooth" },
  };
  const lineChartSeries = [
    { name: "Active Users", data: [30, 35, 32, 40, 38, 45, 50] },
  ];

  // Import users from CSV
  const handleCSVImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axiosInstance.post("api/users/import", formData);
      toast.success("Users imported successfully");
      fetchDashboardData();
    } catch (err) {
      toast.error("Failed to import users");
    }
  };

  // Export stats to CSV
  const handleExportStats = () => {
    const csvContent = [
      ["Metric", "Value"],
      ["Total Users", stats.total],
      ["Active Users", stats.active],
      ["Inactive Users", stats.inactive],
      ["New Users This Week", stats.newUsers],
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dashboard_stats_${timeFilter}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    toast.success("Stats exported successfully");
  };

  // Send bulk email (mock function)
  const handleSendBulkEmail = () => {
    toast.info("Bulk email feature is under development!");
  };

  // Handle time filter change
  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
  };

  // Activity icon based on action type
  const getActivityIcon = (action) => {
    switch (action) {
      case "logged in":
        return <Bell size={16} className="text-blue-500" />;
      case "registered":
        return <BarChart2 size={16} className="text-green-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentUser={currentUser}
      />
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation
          setMobileSidebarOpen={setMobileSidebarOpen}
          currentUser={currentUser}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Dashboard
              </h2>
              <div className="flex space-x-2">
                <select
                  value={timeFilter}
                  onChange={(e) => handleTimeFilterChange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="all">All Time</option>
                </select>
                <button
                  onClick={handleExportStats}
                  className="bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 flex items-center"
                >
                  <Download size={16} className="mr-1" />
                  Export
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner size="large" />
              </div>
            ) : (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 rounded-lg shadow-sm card bg-white dark:bg-gray-800">
                    <p className="text-gray-600 dark:text-gray-400">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {stats.total}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg shadow-sm card bg-white dark:bg-gray-800">
                    <p className="text-gray-600 dark:text-gray-400">
                      Active Users
                    </p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {stats.active}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg shadow-sm card bg-white dark:bg-gray-800">
                    <p className="text-gray-600 dark:text-gray-400">
                      Inactive Users
                    </p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {stats.inactive}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg shadow-sm card bg-white dark:bg-gray-800">
                    <p className="text-gray-600 dark:text-gray-400">
                      New This Period
                    </p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.newUsers}
                    </p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <Chart
                      options={barChartOptions}
                      series={barChartSeries}
                      type="bar"
                      height={300}
                    />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <Chart
                      options={lineChartOptions}
                      series={lineChartSeries}
                      type="line"
                      height={300}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={handleSendBulkEmail}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Mail size={18} className="mr-2" />
                    Send Bulk Email
                  </button>
                  <label className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center cursor-pointer">
                    <Upload size={18} className="mr-2" />
                    Import CSV
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCSVImport}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={fetchDashboardData}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
                  >
                    <BarChart2 size={18} className="mr-2" />
                    Refresh Data
                  </button>
                </div>

                {/* Recent Activity and Notifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">
                      Recent Activity
                    </h3>
                    {recentActivity.length === 0 ? (
                      <p className="text-gray-600 dark:text-gray-300">
                        No recent activity
                      </p>
                    ) : (
                      <ul className="space-y-3">
                        {recentActivity.map((activity, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-800 dark:text-gray-100"
                          >
                            <span className="mr-2">
                              {getActivityIcon(activity.action)}
                            </span>
                            <span>
                              <strong>{activity.user}</strong> {activity.action}{" "}
                              at {new Date(activity.timestamp).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">
                      Notifications
                    </h3>
                    {notifications.length === 0 ? (
                      <p className="text-gray-600 dark:text-gray-300">
                        No new notifications
                      </p>
                    ) : (
                      <ul className="space-y-3">
                        {notifications.map((notification, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-800 dark:text-gray-100"
                          >
                            <Bell size={16} className="mr-2 text-yellow-500" />
                            <span>{notification.message}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
