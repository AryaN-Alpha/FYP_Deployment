import { useState } from 'react';
import  DashboardLayout  from './DashboardLayout';
import  Card  from './ui/Card';
import  Button  from './ui/Button';
import  Badge  from './ui/Badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/Dialog';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen,  CheckCircle, XCircle, Clock, Filter, Eye } from 'lucide-react';

export default function ProgramManagerDashboard({ user, onNavigate, onLogout }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const requests = [
    {
      id: '1',
      studentName: 'John Smith',
      courseCode: 'CS302',
      courseName: 'Database Systems',
      semester: 'Fall 2025',
      status: 'approved',
      advisorName: 'Dr. Smith',
      requestedDate: '2025-10-01',
    },
    {
      id: '2',
      studentName: 'Emily Johnson',
      courseCode: 'CS304',
      courseName: 'Machine Learning',
      semester: 'Fall 2025',
      status: 'pending',
      advisorName: 'Dr. Johnson',
      requestedDate: '2025-10-02',
    },
    {
      id: '3',
      studentName: 'Michael Brown',
      courseCode: 'CS305',
      courseName: 'Computer Networks',
      semester: 'Fall 2025',
      status: 'approved',
      advisorName: 'Dr. Williams',
      requestedDate: '2025-10-03',
    },
    {
      id: '4',
      studentName: 'Sarah Davis',
      courseCode: 'CS301',
      courseName: 'Data Structures',
      semester: 'Spring 2026',
      status: 'rejected',
      advisorName: 'Dr. Smith',
      requestedDate: '2025-10-04',
    },
  ];

  const stats = {
    total: requests.length,
    approved: requests.filter((r) => r.status === 'approved').length,
    pending: requests.filter((r) => r.status === 'pending').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
    approvalRate: ((requests.filter((r) => r.status === 'approved').length / requests.length) * 100).toFixed(1),
  };

  const approvalData = [
    { name: 'Jan', approved: 45, rejected: 8, pending: 12 },
    { name: 'Feb', approved: 52, rejected: 5, pending: 15 },
    { name: 'Mar', approved: 48, rejected: 10, pending: 8 },
    { name: 'Apr', approved: 61, rejected: 7, pending: 10 },
    { name: 'May', approved: 55, rejected: 12, pending: 18 },
    { name: 'Jun', approved: 67, rejected: 6, pending: 14 },
  ];

  const statusDistribution = [
    { name: 'Approved', value: 328, color: '#10b981' },
    { name: 'Pending', value: 77, color: '#f59e0b' },
    { name: 'Rejected', value: 48, color: '#ef4444' },
  ];

  const coursePopularity = [
    { course: 'CS301', requests: 45 },
    { course: 'CS302', requests: 38 },
    { course: 'CS303', requests: 52 },
    { course: 'CS304', requests: 61 },
    { course: 'CS305', requests: 42 },
  ];

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  return (
    <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="pm-dashboard">
      <div className="p-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr from-indigo-200 to-indigo-400 shadow-inner">
                <BookOpen className="w-6 h-6 text-indigo-800" />
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr from-yellow-200 to-yellow-400 shadow-inner">
                <Clock className="w-6 h-6 text-yellow-800" />
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr from-green-200 to-green-400 shadow-inner">
                <CheckCircle className="w-6 h-6 text-green-800" />
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr from-red-200 to-red-400 shadow-inner">
                <XCircle className="w-6 h-6 text-red-800" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Row */}
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
                <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 border-gray-200">
            <h3 className="text-gray-900 mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
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

        {/* Course Popularity */}
        <Card className="p-6 border-gray-200 mb-8">
          <h3 className="text-gray-900 mb-4">Most Requested Courses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={coursePopularity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="course" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="requests" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Requests List */}
        <Card className="border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-gray-900 mb-1">All Course Requests</h2>
                <p className="text-gray-600">Overview of all course enrollment requests</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {requests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gray-900">{request.studentName}</span>
                      <Badge
                        className={
                          request.status === 'approved'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : request.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                            : 'bg-red-100 text-red-700 border-red-200'
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>

                    <div className="text-gray-600">
                      {request.courseCode} - {request.courseName}
                    </div>

                    <div className="text-gray-500 mt-1">
                      {request.semester} • Reviewed by {request.advisorName} • {request.requestedDate}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="gap-2 cursor-pointer" onClick={() => handleViewDetails(request)}>
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Request Details Modal */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Details</DialogTitle>
              <DialogDescription>Complete information about this course request</DialogDescription>
            </DialogHeader>

            {selectedRequest && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Student Name</p>
                    <p className="text-gray-900">{selectedRequest.studentName}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 mb-1">Status</p>
                    <Badge
                      className={
                        selectedRequest.status === 'approved'
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : selectedRequest.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                          : 'bg-red-100 text-red-700 border-red-200'
                      }
                    >
                      {selectedRequest.status}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-gray-600 mb-1">Course Code</p>
                    <p className="text-gray-900">{selectedRequest.courseCode}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 mb-1">Course Name</p>
                    <p className="text-gray-900">{selectedRequest.courseName}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 mb-1">Semester</p>
                    <p className="text-gray-900">{selectedRequest.semester}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 mb-1">Advisor</p>
                    <p className="text-gray-900">{selectedRequest.advisorName}</p>
                  </div>

                  <div>
                    <p className="text-gray-600 mb-1">Requested Date</p>
                    <p className="text-gray-900">{selectedRequest.requestedDate}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
