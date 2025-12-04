import React, { useState } from 'react';
import  DashboardLayout  from './DashboardLayout';
import { BookOpen, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

// ============ UI COMPONENTS ============
import Card from './ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/Table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/Dialog';
import { Select, SelectOption } from './ui/Select';
import { Label } from './ui/Label';
import { Textarea } from './ui/Textarea';
import  Button  from './ui/Button';
import Badge  from './ui/Badge';



// Toast notification (simple)
const showToast = (message, type = 'success') => {
  console.log(`${type.toUpperCase()}: ${message}`);
  alert(message);
};

// ============ MAIN COMPONENT ============

const availableCourses = [
  { code: 'CS301', name: 'Data Structures & Algorithms', credits: 3 },
  { code: 'CS302', name: 'Database Systems', credits: 3 },
  { code: 'CS303', name: 'Web Development', credits: 3 },
  { code: 'CS304', name: 'Machine Learning', credits: 4 },
  { code: 'CS305', name: 'Computer Networks', credits: 3 },
  { code: 'CS306', name: 'Software Engineering', credits: 3 },
  { code: 'CS307', name: 'Operating Systems', credits: 4 },
  { code: 'CS308', name: 'Artificial Intelligence', credits: 4 },
];

const semester1Courses = [
  { code: 'CSC 1991', title: 'Introduction to Information & Communication Technologies', credits: '3 (2+1)', prereq: 'None' },
  { code: 'CSC 1011', title: 'Programming Fundamentals', credits: '4 (3+1)', prereq: 'None' },
  { code: 'ENG 1002', title: 'English Composition & Comprehension', credits: '3 (3+0)', prereq: 'None' },
  { code: 'MTH 1001', title: 'Calculus & Analytical Geometry', credits: '3 (3+0)', prereq: 'None' },
  { code: 'HUM 1002', title: 'Pakistan Studies', credits: '2 (2+0)', prereq: 'None' },
  { code: 'PHY 1002', title: 'Applied Physics', credits: '3 (3+0)', prereq: 'None' },
];

const semester2Courses = [
  { code: 'CSC 1012', title: 'Object Oriented Programming', credits: '4 (3+1)', prereq: 'Programming Fundamentals' },
  { code: 'ENG 1011', title: 'Communication & Presentation Skills', credits: '3 (3+0)', prereq: 'English Composition & Comprehension' },
  { code: 'CSC 2031', title: 'Discrete Structures', credits: '3 (3+0)', prereq: 'None' },
  { code: 'SEN 1001', title: 'Introduction to Software Engineering', credits: '3 (3+0)', prereq: 'None' },
  { code: 'HUM 1001', title: 'Islamic Studies', credits: '2 (2+0)', prereq: 'None' },
  { code: '-', title: 'University Elective - I', credits: '3 (3+0)', prereq: '-' },
];

const semester3Courses = [
  { code: 'CSC 2031', title: 'Data Structures & Algorithms', credits: '4 (3+1)', prereq: 'Object Oriented Programming' },
  { code: 'SEN 2011', title: 'Software Requirement Engineering', credits: '3 (3+0)', prereq: 'Introduction to Software Engineering' },
  { code: 'CSC 2061', title: 'Human Computer Interaction', credits: '3 (3+0)', prereq: 'Introduction to Software Engineering' },
  { code: 'MTH 2021', title: 'Linear Algebra', credits: '3 (3+0)', prereq: 'None' },
  { code: '-', title: 'University Elective - II', credits: '3 (3+0)', prereq: '-' },
];

export default function StudentDashboard({ onNavigate, onLogout }) {
  const [requests, setRequests] = useState([
    {
      id: '1',
      courseCode: 'CS301',
      courseName: 'Data Structures & Algorithms',
      credits: 3,
      semester: 'Fall 2025',
      status: 'approved',
      requestedDate: '2025-09-15',
      reviewedBy: 'Dr. Smith',
      comment: 'Prerequisites met. Approved.',
    },
    {
      id: '2',
      courseCode: 'CS302',
      courseName: 'Database Systems',
      credits: 3,
      semester: 'Fall 2025',
      status: 'pending',
      requestedDate: '2025-10-01',
    },
    {
      id: '3',
      courseCode: 'CS304',
      courseName: 'Machine Learning',
      credits: 4,
      semester: 'Fall 2025',
      status: 'rejected',
      requestedDate: '2025-09-20',
      reviewedBy: 'Dr. Johnson',
      comment: 'Missing prerequisite: CS301',
    },
  ]);

    const { user } = useUser();

  //   const [user, setUser] = useState({
  //   id: 1,
  //   name: "John Doe",
  //   role: "student",
  //   email: "john.doe@example.com"
  // });
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [selectedCourse, setSelectedCourse] = useState('');
const [semester, setSemester] = useState('');
const [notes, setNotes] = useState('');
  

  const handleSubmitRequest = () => {
    alert(`Course ${selectedCourse} requested for ${selectedSemester}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  };

  return (
    <DashboardLayout user={user} onNavigate={onNavigate} onLogout={onLogout} currentPage="student-dashboard">
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

        {/* Semester 1 Courses */}
        <Card className="mt-10 shadow-md hover:shadow-lg transition-shadow">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
            <h2 className="text-gray-900 mb-1 text-xl font-semibold text-center">
              Scheme of Studies — Semester 1
            </h2>
            <p className="text-gray-600 text-sm text-center">
              Here's your semester overview with credit hours and prerequisites
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Course Code</TableHead>
                <TableHead>Course Title</TableHead>
                <TableHead>Credits Hrs</TableHead>
                <TableHead>Prerequisite</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {semester1Courses.map((course) => (
                <TableRow key={course.code} className="hover:bg-blue-50">
                  <TableCell className="font-medium text-gray-800">{course.code}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell className="text-center">{course.credits}</TableCell>
                  <TableCell className="text-center">{course.prereq}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-900 hover:to-blue-700 rounded-full shadow-lg transform hover:scale-105 cursor-pointer"
                    >
                      Request
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-100 font-semibold">
                <TableCell colSpan={2}>Total Credit Hours</TableCell>
                <TableCell colSpan={3}>18 (00+18=18)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        {/* Semester 2 Courses */}
        <Card className="mt-10 shadow-md hover:shadow-lg transition-shadow">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
            <h2 className="text-gray-900 mb-1 text-xl font-semibold text-center">
              Scheme of Studies — Semester 2
            </h2>
            <p className="text-gray-600 text-sm text-center">
              Overview of the second semester courses and credit hours
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Course Code</TableHead>
                <TableHead>Course Title</TableHead>
                <TableHead>Credits Hrs</TableHead>
                <TableHead>Prerequisite</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {semester2Courses.map((course) => (
                <TableRow key={course.code} className="hover:bg-blue-50">
                  <TableCell className="font-medium text-gray-800">{course.code}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell className="text-center">{course.credits}</TableCell>
                  <TableCell className="text-center">{course.prereq}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-900 hover:to-blue-700 rounded-full shadow-lg transform hover:scale-105 cursor-pointer"
                    >
                      Request
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-100 font-semibold">
                <TableCell colSpan={2}>Total Credit Hours</TableCell>
                <TableCell colSpan={3}>18 (18+18=36)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        {/* Semester 3 Courses */}
        <Card className="mt-10 shadow-md hover:shadow-lg transition-shadow">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
            <h2 className="text-gray-900 mb-1 text-xl font-semibold text-center">
              Scheme of Studies — Semester 3
            </h2>
            <p className="text-gray-600 text-sm text-center">
              Overview of the third semester courses and credit hours
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Course Code</TableHead>
                <TableHead>Course Title</TableHead>
                <TableHead>Credits Hrs</TableHead>
                <TableHead>Prerequisite</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {semester3Courses.map((course) => (
                <TableRow key={course.code} className="hover:bg-blue-50">
                  <TableCell className="font-medium text-gray-800">{course.code}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell className="text-center">{course.credits}</TableCell>
                  <TableCell className="text-center">{course.prereq}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-900 hover:to-blue-700 rounded-full shadow-lg transform hover:scale-105 cursor-pointer"
                    >
                      Request
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-100 font-semibold">
                <TableCell colSpan={2}>Total Credit Hours</TableCell>
                <TableCell colSpan={3}>18 (18+18=36)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        {/* My Course Requests */}
        <Card className="mt-10 shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-900 mb-1 text-xl font-semibold">My Course Requests</h2>
                <p className="text-gray-600 text-sm">Track the status of your course enrollment requests</p>
              </div>
              <Button onClick={() => setIsDialogOpen(true)}
                className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-900 hover:to-blue-700 rounded-full shadow-lg transform hover:scale-105 cursor-pointer"
                >
                <Plus className="w-4 h-4" />
                Request Course
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Code</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested Date</TableHead>
                <TableHead>Reviewed By</TableHead>
                <TableHead>Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.courseCode}</TableCell>
                  <TableCell>{request.courseName}</TableCell>
                  <TableCell>{request.credits}</TableCell>
                  <TableCell>{request.semester}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusIcon(request.status)}
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.requestedDate}</TableCell>
                  <TableCell>{request.reviewedBy || '-'}</TableCell>
                  <TableCell>{request.comment || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Request Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request New Course</DialogTitle>
              <DialogDescription>
                Select a course and semester to submit your request
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label>Course</Label>
                <Select
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                  placeholder="Select a course"
                >
                  {availableCourses.map((course) => (
                    <SelectOption key={course.code} value={course.code}>
                      {course.code} - {course.name} ({course.credits} credits)
                    </SelectOption>
                  ))}
                </Select>
              </div>

              <div>
                <Label>Semester</Label>
                <Select
                  value={semester}
                  onValueChange={setSemester}
                  placeholder="Select semester"
                >
                  <SelectOption value="Fall 2025">Fall 2025</SelectOption>
                  <SelectOption value="Spring 2026">Spring 2026</SelectOption>
                  <SelectOption value="Summer 2026">Summer 2026</SelectOption>
                </Select>
              </div>

              <div>
                <Label>Additional Notes (Optional)</Label>
                <Textarea
                  placeholder="Any additional information for your advisor..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSubmitRequest}>
                  Submit Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}