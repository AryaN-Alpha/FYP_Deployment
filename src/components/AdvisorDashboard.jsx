import { useState } from "react";
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

export default function ProgramManagerDashboard() {
  const approvalData = [
    { name: "Jan", approved: 45, rejected: 8, pending: 12 },
    { name: "Feb", approved: 52, rejected: 5, pending: 15 },
    { name: "Mar", approved: 48, rejected: 10, pending: 8 },
    { name: "Apr", approved: 61, rejected: 7, pending: 10 },
    { name: "May", approved: 55, rejected: 12, pending: 18 },
    { name: "Jun", approved: 67, rejected: 6, pending: 14 },
  ];

  const statusDistribution = [
    { name: "Approved", value: 328, color: "#10b981" },
    { name: "Pending", value: 77, color: "#f59e0b" },
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main */}
      <main className="flex-1 p-8">
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Approval Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={approvalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Popularity */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold mb-4">Most Requested Courses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={coursePopularity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="course" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="requests" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
