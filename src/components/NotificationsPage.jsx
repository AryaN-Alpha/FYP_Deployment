import { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import Button from "./ui/Button";
import { Bell, CheckCircle, XCircle, Clock, Info, Check } from "lucide-react";

export default function NotificationsPage({ user, onNavigate, onLogout }) {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "success",
      title: "Course Request Approved",
      message:
        "Your request for CS301 - Data Structures & Algorithms has been approved by Dr. Smith.",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "error",
      title: "Course Request Rejected",
      message:
        "Your request for CS304 - Machine Learning was rejected. Reason: Missing prerequisite CS301.",
      timestamp: "5 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "warning",
      title: "Pending Review",
      message:
        "Your course request for CS302 - Database Systems is pending advisor review.",
      timestamp: "1 day ago",
      read: false,
    },
    {
      id: "4",
      type: "info",
      title: "New Course Available",
      message:
        "CS308 - Artificial Intelligence is now available for enrollment in Spring 2026.",
      timestamp: "2 days ago",
      read: true,
    },
    {
      id: "5",
      type: "success",
      title: "Profile Updated",
      message: "Your profile information has been successfully updated.",
      timestamp: "3 days ago",
      read: true,
    },
    {
      id: "6",
      type: "info",
      title: "System Maintenance",
      message:
        "The system will undergo maintenance on October 15, 2025 from 2:00 AM to 4:00 AM.",
      timestamp: "4 days ago",
      read: true,
    },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

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
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout
      user={user}
      onNavigate={onNavigate}
      onLogout={onLogout}
      currentPage="notifications"
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-gray-900 mb-2 text-xl sm:text-2xl">Notifications</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Stay updated with your course requests and system alerts
              </p>
            </div>

            {unreadCount > 0 && (
              <Button
                variant="outline"
                onClick={handleMarkAllAsRead}
                className="flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Mark All as Read
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {/* Total */}
          <div className="p-5 sm:p-6 border rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1 text-sm sm:text-base">Total Notifications</p>
                <p className="text-gray-900 font-medium text-lg">{notifications.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Unread */}
          <div className="p-5 sm:p-6 border rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1 text-sm sm:text-base">Unread</p>
                <p className="text-gray-900 font-medium text-lg">{unreadCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`border rounded-xl bg-white shadow-sm p-4 sm:p-5 transition-all ${
                !n.read ? "border-l-4 border-l-blue-500" : ""
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4 flex-wrap">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${getBackgroundColor(
                    n.type
                  )}`}
                >
                  {getIcon(n.type)}
                </div>

                <div className="flex-1 min-w-[240px]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-gray-900 font-medium text-base sm:text-lg">
                        {n.title}
                      </h3>

                      {!n.read && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                          New
                        </span>
                      )}
                    </div>

                    <span className="text-gray-500 text-sm">{n.timestamp}</span>
                  </div>

                  <p className="text-gray-600 mb-3 text-sm sm:text-base">{n.message}</p>

                  {!n.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAsRead(n.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="p-10 sm:p-12 text-center border rounded-xl bg-white shadow-sm mt-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2 text-lg sm:text-xl">No Notifications</h3>
            <p className="text-gray-600">You're all caught up!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
