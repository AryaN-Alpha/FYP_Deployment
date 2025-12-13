import DashboardLayout from "./DashboardLayout";
import Card from "./ui/Card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsView() {
  /* =======================
     Required Data Arrays
     ======================= */

  const approvalData = [
    { name: "Jan", approved: 45, rejected: 8, new: 12 },
    { name: "Feb", approved: 52, rejected: 5, new: 15 },
    { name: "Mar", approved: 48, rejected: 10, new: 8 },
    { name: "Apr", approved: 61, rejected: 7, new: 10 },
    { name: "May", approved: 55, rejected: 12, new: 18 },
    { name: "Jun", approved: 67, rejected: 6, new: 14 },
  ];

  const statusDistribution = [
    { name: "Approved", value: 328, color: "#10b981" },
    { name: "New", value: 77, color: "#f59e0b" },
    { name: "Rejected", value: 48, color: "#ef4444" },
  ];

  const coursePopularity = [
    { course: "CS301", requests: 45 },
    { course: "CS302", requests: 38 },
    { course: "CS303", requests: 52 },
    { course: "CS304", requests: 61 },
    { course: "CS305", requests: 42 },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">

        {/* ===== Approval Trends ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-gray-200">
            <h3 className="text-gray-900 mb-4">Approval Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={approvalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="new" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* ===== Status Distribution ===== */}
          <Card className="p-6 border-gray-200">
            <h3 className="text-gray-900 mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* ===== Course Popularity ===== */}
        <Card className="p-6 border-gray-200">
          <h3 className="text-gray-900 mb-4">Most Requested Courses</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={coursePopularity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="course" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar
                dataKey="requests"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

      </div>
    </DashboardLayout>
  );
}
