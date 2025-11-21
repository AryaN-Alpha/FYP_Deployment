import { useState } from 'react';
import { User as UserIcon, Mail, Calendar, Shield, Save } from 'lucide-react';
import { toast } from "sonner";


export default function ProfilePage() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    batchNo: '23A',
    age: 22,
    role: 'student',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    batchNo: user.batchNo || '',
    age: user.age || 0,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    toast.success('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2 text-2xl font-semibold">Profile Settings</h2>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="border border-gray-200 p-6 bg-white rounded-2xl shadow-sm">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <h3 className="text-gray-900 mb-1 font-semibold">{user.name}</h3>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              <Shield className="w-4 h-4" />
              <span>{user.role.replace('_', ' ')}</span>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

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

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="border border-gray-200 bg-white rounded-2xl shadow-sm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-gray-900 mb-1 font-semibold">Personal Information</h3>
                <p className="text-gray-600">Update your personal details</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="p-6">
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {user.role === 'student' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="batchNo" className="block text-sm font-medium text-gray-700">
                        Batch Number
                      </label>
                      <input
                        id="batchNo"
                        value={profileData.batchNo}
                        onChange={(e) => setProfileData({ ...profileData, batchNo: e.target.value })}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                        Age
                      </label>
                      <input
                        id="age"
                        type="number"
                        value={profileData.age}
                        onChange={(e) =>
                          setProfileData({ ...profileData, age: parseInt(e.target.value) })
                        }
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                )}

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="border border-gray-200 bg-white rounded-2xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-gray-900 mb-1 font-semibold">Change Password</h3>
              <p className="text-gray-600">Update your password to keep your account secure</p>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleChangePassword}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Account Information */}
          <div className="border border-gray-200 bg-white rounded-2xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-gray-900 mb-1 font-semibold">Account Information</h3>
              <p className="text-gray-600">View your account details</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-600">Account Type</span>
                <span className="text-gray-900">{user.role.replace('_', ' ')}</span>
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
  );
}
