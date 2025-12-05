import { useState } from 'react';
import  DashboardLayout  from './DashboardLayout';
import  Card  from './ui/Card';
import  Button  from './ui/Button';
import  Badge  from './ui/Badge';
import { Textarea } from './ui/Textarea';
import {  User, BookOpen, CheckCircle, XCircle, MessageSquare, Clock, Eye} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/Dialog';
import { toast } from 'sonner';

export default function AdvisorDashboard({ user, onNavigate, onLogout }) {
  const [requests, setRequests] = useState([
    {
      id: '1',
      studentName: 'John Smith',
      studentId: 'STU-2021-001',
      studentBatch: 'CS-2021',
      courseCode: 'CS302',
      courseName: 'Database Systems',
      credits: 3,
      semester: 'Fall 2025',
      requestedDate: '2025-10-01',
      prerequisites: ['CS101', 'CS201'],
      hasMetPrerequisites: true,
      studentGPA: 3.5,
      status: 'pending',
    },
    {
      id: '2',
      studentName: 'Emily Johnson',
      studentId: 'STU-2021-002',
      studentBatch: 'CS-2021',
      courseCode: 'CS304',
      courseName: 'Machine Learning',
      credits: 4,
      semester: 'Fall 2025',
      requestedDate: '2025-10-02',
      prerequisites: ['CS301', 'MATH201'],
      hasMetPrerequisites: false,
      studentGPA: 3.8,
      status: 'pending',
    },
    {
      id: '3',
      studentName: 'Michael Brown',
      studentId: 'STU-2021-003',
      studentBatch: 'CS-2021',
      courseCode: 'CS305',
      courseName: 'Computer Networks',
      credits: 3,
      semester: 'Fall 2025',
      requestedDate: '2025-10-03',
      prerequisites: ['CS201'],
      hasMetPrerequisites: true,
      studentGPA: 3.2,
      status: 'pending',
    },
  ]);

  const [comments, setComments] = useState({});
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

const handleViewDetails = (request) => {
  setSelectedRequest(request);
  setIsDetailsOpen(true);
};



   const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  };



  const handleApprove = (requestId) => {
    const comment = comments[requestId] || 'Prerequisites met. Approved.';
    toast.success('Request approved successfully!');
    setRequests(requests.filter((r) => r.id !== requestId));
    setComments({ ...comments, [requestId]: '' });
  };

  const handleReject = (requestId) => {
    const comment = comments[requestId];
    if (!comment) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    toast.success('Request rejected with comments');
    setRequests(requests.filter((r) => r.id !== requestId));
    setComments({ ...comments, [requestId]: '' });
  };

  return (
    <DashboardLayout >
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



        {/* Requests Table */}
        <Card className="border-gray-200">
  <div className="p-6 border-b border-gray-200">
    <h2 className="text-gray-900 mb-1">Pending Course Requests</h2>
    <p className="text-gray-600">Review all student course requests</p>
  </div>

  <div className="divide-y divide-gray-200">
    {requests.map((request) => (
      <div key={request.id} className="p-6 hover:bg-gray-50">
        <div className="flex items-center justify-between">

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-gray-900 font-medium">
                {request.studentName}
              </span>

              <Badge
                className={
                  request.hasMetPrerequisites
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-red-100 text-red-700 border-red-200"
                }
              >
                {request.hasMetPrerequisites
                  ? "Prerequisites Met"
                  : "Missing Prerequisites"}
              </Badge>
            </div>

            <div className="text-gray-600">
              {request.courseCode} — {request.courseName}
            </div>

            <div className="text-gray-500 mt-1">
              {request.semester} • Requested on {request.requestedDate}
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 cursor-pointer"
            onClick={() => handleViewDetails(request)}
          >
            <Eye className="w-4 h-4" />
            View Details
          </Button>
        </div>
      </div>
    ))}
  </div>

  {requests.length === 0 && (
    <Card className="p-12 text-center border-gray-200">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageSquare className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-gray-900 mb-2">No requests found</h3>
      <p className="text-gray-600">All requests have been processed</p>
    </Card>
  )}
</Card>
<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Request Details</DialogTitle>
      <DialogDescription>Review course request information</DialogDescription>
    </DialogHeader>

    {selectedRequest && (
      <div className="space-y-6 mt-4">

        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Student Name</p>
            <p className="text-gray-900">{selectedRequest.studentName}</p>
          </div>

          <div>
            <p className="text-gray-600">Status</p>
            <Badge
              className={
                selectedRequest.hasMetPrerequisites
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-red-100 text-red-700 border-red-200"
              }
            >
              {selectedRequest.hasMetPrerequisites
                ? "Prerequisites Met"
                : "Missing Prerequisites"}
            </Badge>
          </div>

          <div>
            <p className="text-gray-600">Course Code</p>
            <p className="text-gray-900">{selectedRequest.courseCode}</p>
          </div>

          <div>
            <p className="text-gray-600">Course Name</p>
            <p className="text-gray-900">{selectedRequest.courseName}</p>
          </div>

          <div>
            <p className="text-gray-600">Semester</p>
            <p className="text-gray-900">{selectedRequest.semester}</p>
          </div>

          <div>
            <p className="text-gray-600">Requested Date</p>
            <p className="text-gray-900">{selectedRequest.requestedDate}</p>
          </div>
        </div>

        {/* Prerequisites */}
        <div>
          <p className="text-gray-600 mb-1">Prerequisites</p>
          <div className="flex flex-wrap gap-2">
            {selectedRequest.prerequisites.map((pre, idx) => (
              <Badge key={idx} variant="outline" className="text-gray-700">
                {pre}
              </Badge>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div>
          <p className="text-gray-600 mb-1">Comments</p>
          <Textarea
            rows={3}
            placeholder="Add comments..."
            value={comments[selectedRequest.id] || ""}
            onChange={(e) =>
              setComments({
                ...comments,
                [selectedRequest.id]: e.target.value,
              })
            }
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            className="flex-1 text-red-600 border-red-200 bg-red-200 hover:bg-red-300"
            variant="outline"
            onClick={() => {
              handleReject(selectedRequest.id);
              setIsDetailsOpen(false);
            }}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>

          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => {
              handleApprove(selectedRequest.id);
              setIsDetailsOpen(false);
            }}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve
          </Button>
        </div>

      </div>
    )}
  </DialogContent>
</Dialog>


      </div>
    </DashboardLayout>
  );
}
