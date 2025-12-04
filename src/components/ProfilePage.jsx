import { useState } from "react";
import  DashboardLayout  from "./DashboardLayout";
import  Button  from "./ui/Button";
import { User as UserIcon, Mail, Calendar, Shield, Save } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "../context/UserContext";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
 const { user } = useUser();
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    batchNo: user.batchNo || "",
    age: user.age || 0,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("Please fill all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    toast.success("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <DashboardLayout
      user={user}
    >
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Profile Settings</h2>
          <p className="text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>

              <h3 className="text-gray-900 mb-1">{user.name}</h3>
              <p className="text-gray-600 mb-4">{user.email}</p>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                <Shield className="w-4 h-4" />
                <span>{user.role.replace("_", " ")}</span>
              </div>
            </div>

            {/* Separator */}
            <div className="my-6 border-b" />

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>

              {user.batchNo && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Batch: {user.batchNo}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-gray-600">
                <UserIcon className="w-4 h-4" />
                <span>Member since 2021</span>
              </div>
            </div>
          </div>

          {/* Main Right Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <div className="border border-gray-200 bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-gray-900 mb-1">Personal Information</h3>
                  <p className="text-gray-600">Update your personal details</p>
                </div>

                {!isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {/* NAME */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      className="w-full border rounded-md px-3 py-2"
                      value={profileData.name}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full border rounded-md px-3 py-2"
                      value={profileData.email}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Student Fields */}
                {user.role === "student" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Batch Number
                      </label>
                      <input
                        className="w-full border rounded-md px-3 py-2"
                        value={profileData.batchNo}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            batchNo: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Age</label>
                      <input
                        type="number"
                        className="w-full border rounded-md px-3 py-2"
                        value={profileData.age}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            age: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {/* Save Buttons */}
                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button className="gap-2" onClick={handleSaveProfile}>
                      <Save className="w-4 h-4" /> Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Change Password */}
            <div className="border border-gray-200 bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-gray-900 mb-1">Change Password</h3>
                <p className="text-gray-600">
                  Update your password to keep your account secure
                </p>
              </div>

              <div className="p-6 space-y-5">
                {/* CURRENT */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="Enter current password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>

                {/* NEW */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <input
                    type="password"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="Enter new password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>

                {/* CONFIRM */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <Button onClick={handleChangePassword}
                className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-900 hover:to-blue-700 rounded-full shadow-lg transform hover:scale-105 cursor-pointer"
                >Update Password</Button>
              </div>
            </div>

            {/* Account Info */}
            <div className="border border-gray-200 bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-gray-900 mb-1">Account Information</h3>
                <p className="text-gray-600">View your account details</p>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Account Type</span>
                  <span className="text-gray-900">
                    {user.role.replace("_", " ")}
                  </span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Account Status</span>
                  <span className="text-green-600">Active</span>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Member Since</span>
                  <span className="text-gray-900">September 2021</span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Last Login</span>
                  <span className="text-gray-900">Today, 10:30 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}