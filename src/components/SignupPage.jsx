import React, { useState } from "react";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    batchNo: "",
    age: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    let isValid = true;

    if (name === "email") {
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (name === "password") {
      isValid = value.length >= 8;
    } else if (name === "confirmPassword") {
      isValid = value === form.password;
    } else if (name === "age") {
      isValid = value >= 16 && value <= 100;
    } else {
      isValid = value.trim() !== "";
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Simple validation without error state
  if (form.name.trim() === "") {
    alert("Name is required");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    alert("Enter a valid email");
    return;
  }

  if (form.batchNo.trim() === "") {
    alert("Batch number is required");
    return;
  }

  if (!(form.age >= 16 && form.age <= 100)) {
    alert("Age must be between 16 and 100");
    return;
  }

  if (form.password.length < 8) {
    alert("Password must be at least 8 characters");
    return;
  }

  if (form.confirmPassword !== form.password) {
    alert("Passwords do not match");
    return;
  }
    if(form.email.includes("student")) {
        navigate("/studentdashboard");
      }else if(form.email.includes("advisor")) {
        navigate("/advisordashboard");
      } else if(form.email.includes("pm")) {
        navigate("/pmdashboard");
      }
  // If validation passes → send API
  // try {
  //   const response = await fetch("http://127.0.0.1:8000/api/signup/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       name: form.name,
  //       email: form.email,
  //       batch_number: form.batchNo,  // <-- match backend
  //       age: form.age,
  //       password: form.password,
  //   }),
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     alert("Account created successfully!");
  //   //   onNavigate("login");
  //   } else {
  //     alert( "Signup failed");
  //   }
  // } catch (err) {
  //   alert("Server error — backend not responding.");
  // }
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Header */}
      <header className="bg-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-700 hover:text-black transition cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>
      </header>

      {/* Signup Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <GraduationCap size={32} className="text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-semibold text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Join our university course portal
          </p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full p-2.5 bg-gray-100 border rounded-lg transition focus:outline-none border-gray-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="student@university.edu"
                className="w-full p-2.5 bg-gray-100 border rounded-lg transition focus:outline-none border-gray-300"
              />
            </div>

            {/* Batch */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Batch Number</label>
              <input
                name="batchNo"
                value={form.batchNo}
                onChange={handleChange}
                placeholder="CS-2021"
                className="w-full p-2.5 bg-gray-100 border rounded-lg transition focus:outline-none border-gray-300"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Age</label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                placeholder="22"
                className="w-full p-2.5 bg-gray-100 border rounded-lg transition focus:outline-none border-gray-300"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="w-full p-2.5 bg-gray-100 border rounded-lg transition focus:outline-none border-gray-300"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full p-2.5 bg-gray-100 border rounded-lg transition focus:outline-none border-gray-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-black hover:bg-gray-900 text-white rounded-lg transition font-medium cursor-pointer"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 font-medium hover:underline cursor-pointer"
              >
                Log in
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
