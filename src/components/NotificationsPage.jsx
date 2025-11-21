import { useState } from "react";
import { Bell, CheckCircle, XCircle, Clock, Info, X } from "lucide-react";

export default function NotificationsPage() {
  const [notifications] = useState([
    {
      id: "1",
      type: "success",
      title: "Course Request Approved",
      courseCode: "CS301",
      courseName: "Data Structures & Algorithms",
      reviewedBy: "Dr. Smith",
      message:
        "Your request for CS301 - Data Structures & Algorithms has been approved.",
      details:
        "Your course request was successfully reviewed and approved by Dr. Smith on October 30, 2025. You are now officially enrolled for the Spring 2026 semester.",
      timestamp: "2 hours ago",
      status: "Approved",
    },
    {
      id: "2",
      type: "error",
      title: "Course Request Rejected",
      courseCode: "CS304",
      courseName: "Machine Learning",
      reviewedBy: "Dr. Adams",
      message:
        "Your request for CS304 - Machine Learning was rejected due to missing prerequisites.",
      details:
        "Reason for rejection: You must complete CS301 - Data Structures & Algorithms before enrolling in CS304. Please contact your advisor for further assistance.",
      timestamp: "5 hours ago",
      status: "Rejected",
    },
    {
      id: "3",
      type: "warning",
      title: "Pending Review",
      courseCode: "CS302",
      courseName: "Database Systems",
      reviewedBy: "Awaiting Advisor Review",
      message:
        "Your request for CS302 - Database Systems is pending advisor approval.",
      details:
        "Your course request has been submitted successfully and is currently under advisor review. You will be notified once it is approved or rejected.",
      timestamp: "1 day ago",
      status: "Pending",
    },
    {
      id: "4",
      type: "info",
      title: "New Course Available",
      courseCode: "CS308",
      courseName: "Artificial Intelligence",
      reviewedBy: "System Admin",
      message:
        "CS308 - Artificial Intelligence is now open for enrollment in Spring 2026.",
      details:
        "Explore advanced AI topics, including neural networks, search algorithms, and reinforcement learning. Register early to secure your spot.",
      timestamp: "2 days ago",
      status: "Information",
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "warning":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50";
      case "error":
        return "bg-red-50";
      case "warning":
        return "bg-yellow-50";
      case "info":
        return "bg-blue-50";
      default:
        return "bg-gray-50";
    }
  };

  const unreadCount = notifications.length;

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            Notifications
          </h2>
          <p className="text-gray-600">
            Stay updated with your course requests and system alerts
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Notifications</p>
              <p className="text-xl font-semibold text-gray-900">
                {notifications.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Unread</p>
              <p className="text-xl font-semibold text-gray-900">
                {unreadCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className='border border-gray-200 rounded-xl bg-white shadow-sm transition-all'
          >
            <div className="p-5 flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getBackgroundColor(
                  notification.type
                )}`}
              >
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  <span className="text-sm text-gray-500 flex-shrink-0">
                    {notification.timestamp}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{notification.message}</p>
                <button
                  onClick={() => setSelectedNotification(notification)}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  View Full Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                {getIcon(selectedNotification.type)}
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedNotification.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 font-medium">Course Code</p>
                  <p className="text-gray-900 font-semibold">
                    {selectedNotification.courseCode}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Course Name</p>
                  <p className="text-gray-900 font-semibold">
                    {selectedNotification.courseName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Reviewed By</p>
                  <p className="text-gray-900 font-semibold">
                    {selectedNotification.reviewedBy}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Status</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                      selectedNotification.type === "success"
                        ? "bg-green-100 text-green-700"
                        : selectedNotification.type === "error"
                        ? "bg-red-100 text-red-700"
                        : selectedNotification.type === "warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {selectedNotification.status}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-gray-800 font-semibold mb-2">Comment</h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedNotification.details}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedNotification(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
