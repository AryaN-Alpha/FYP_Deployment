import { useState } from "react";
import { GraduationCap, ArrowLeft, UserCircle, Shield } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    batchNo: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();

    // const { email, password, batchNo } = formData;

    // if (!email || !password || !batchNo) {
    //   setError("Please fill all fields");
    //   return;
    // }

    // setLoading(true);

    try {
    //   const response = await fetch("http://127.0.0.1:8000/api/login/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     setError(data.error || "Invalid credentials");
    //     setLoading(false);
    //     return;
    //   }
    //   localStorage.setItem("access", data.access);
    //   localStorage.setItem("refresh", data.refresh);

      setUser({
        id: 1,
        name: "John Doe",
        role: "student",
        email: formData.email
      });

      setError("Login successful!");

      if(email.includes("student")) {
        navigate("/studentdashboard");
      }else if(email.includes("advisor")) {
        navigate("/advisordashboard");
      } else if(email.includes("pm")) {
        navigate("/pmdashboard");
      }
      
    } catch (error) {
      setError("Server error. Try again.");
    }

    setLoading(false);
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();

    
    // const { email, password, batchNo } = formData;

    // if (!email || !password || !batchNo) {
    //   setError("Please fill all fields");
    //   return;
    // }

    // setLoading(true);

    try {
    //   const response = await fetch("http://127.0.0.1:8000/api/login/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email,
    //       password,
    //     }),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     setError(data.error || "Invalid credentials");
    //     setLoading(false);
    //     return;
    //   }
    //   localStorage.setItem("access", data.access);
    //   localStorage.setItem("refresh", data.refresh);

      setUser({
        id: 1,
        name: "John Doe",
        role: "student",
        email: email
      });

      setError("Login successful!");

      if(email.includes("student")) {
        navigate("/studentdashboard");
      }else if(email.includes("advisor")) {
        navigate("/advisordashboard");
      } else if(email.includes("pm")) {
        navigate("/pmdashboard");
      }
      
    } catch (error) {
      setError("Server error. Try again.");
    }

    setLoading(false);
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <h2 className="text-center text-gray-900 mb-2">Select Your Role</h2>
              <p className="text-center text-gray-600 mb-8">
                Choose how you want to sign in
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => setUserRole("student")}
                  className="w-full bg-white border-2 border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Student</h3>
                    <p className="text-sm text-gray-600">Access student dashboard</p>
                  </div>
                </button>

                <button
                  onClick={() => setUserRole("admin")}
                  className="w-full bg-white border-2 border-gray-300 rounded-lg p-6 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Admin/Advisor/PM</h3>
                    <p className="text-sm text-gray-600">Access admin dashboard</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => setUserRole(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Role Selection
          </button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">

            <div className="flex justify-center mb-6">
              <div className={`w-16 h-16 ${userRole === "student" ? "bg-blue-100" : "bg-purple-100"} rounded-full flex items-center justify-center`}>
                {userRole === "student" ? (
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                ) : (
                  <Shield className="w-8 h-8 text-purple-600" />
                )}
              </div>
            </div>

            <h2 className="text-center text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-center text-gray-600 mb-8">
              Sign in as {userRole === "student" ? "Student" : "Admin/Advisor/PM"}
            </p>

            <form onSubmit={userRole === "student" ? handleStudentSubmit : handleAdminSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder={userRole === "student" ? "student@university.edu" : "admin@university.edu"}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              {userRole === "student" && (
                <div className="space-y-2">
                  <label className="text-gray-700">Batch Number</label>
                  <input
                    type="text"
                    name="batchNo"
                    placeholder="e.g. CS-2021"
                    value={formData.batchNo}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              )}

              {error && <p className="text-red-500 text-md mt- text-center">{error}</p>}
              
              <button
                type="submit"
                className={`w-full ${userRole === "student" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"} text-white py-2 rounded-md transition-colors cursor-pointer`}
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
