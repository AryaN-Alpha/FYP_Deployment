import { useState } from "react";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    batchNo: "",
  });

  const [loading, setLoading] = useState(false);

  // UNIVERSAL ONCHANGE HANDLER  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, batchNo } = formData;

    if (!email || !password || !batchNo) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

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

      // setUser({
      //   id: 1,
      //   name: data.user.name,
      //   role: "student",
      //   email: data.user.email
      // });
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
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

      {/* LOGIN FORM */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <h2 className="text-center text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-center text-gray-600 mb-8">
              Sign in to access your dashboard
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* PASSWORD */}
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

              {/* BATCH NO */}
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
               {error && <p className="text-red-500 text-md mt- text-center">{error}</p>}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
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
