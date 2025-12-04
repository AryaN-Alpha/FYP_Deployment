import { GraduationCap, BookOpen, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-white">

            {/* Header */}
            <header className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-8 h-8 text-blue-600" />
                        <span className="text-blue-900">University Course Portal</span>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("login")}
                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => navigate("signup")}
                            className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-800 hover:to-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-blue-50 to-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        <div>
                            <h1 className="text-blue-900 mb-4">
                                Streamline Your Course Request Process
                            </h1>

                            <p className="text-gray-600 mb-8">
                                A comprehensive portal that automates course offering and approval workflows
                                among students, advisors, program managers, and support officers.
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => navigate("signup")}
                                    className="bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-800 hover:to-blue-700 text-white px-4 py-2 rounded-md  cursor-pointer"
                                >
                                    Get Started
                                </button>

                                <button
                                    onClick={() => navigate("login")}
                                    className="border border-gray-300 text-gray-700 px-5 py-3 rounded-md cursor-pointer hover:bg-gray-100"
                                >
                                    Sign In
                                </button>
                            </div>
                        </div>

                        <div className="rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1706016899218-ebe36844f70e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                                alt="University Campus"
                                className="w-full h-96 object-cover"
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-12">
                        <h2 className="text-gray-900 mb-4">Key Features</h2>
                        <p className="text-gray-600">
                            Everything you need to manage course requests efficiently
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        {/* Feature 1 */}
                        <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-blue-700 text-xl font-bold">📚</span>
                            </div>
                            <h3 className="text-gray-900 mb-2">Course Request Management</h3>
                            <p className="text-gray-600">
                                Students can easily browse available courses and submit requests with real-time status tracking.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-green-700 text-xl font-bold">✔</span>
                            </div>
                            <h3 className="text-gray-900 mb-2">Approval Workflows</h3>
                            <p className="text-gray-600">
                                Streamlined approval process for advisors and program managers with comprehensive review tools.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-gray-700 text-xl font-bold">👥</span>
                            </div>
                            <h3 className="text-gray-900 mb-2">Multi-Role Support</h3>
                            <p className="text-gray-600">
                                Tailored dashboards for students, advisors, program managers, support officers, and admins.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid md:grid-cols-4 gap-8">

                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <GraduationCap className="w-6 h-6 text-blue-600" />
                                <span className="text-gray-900">Course Portal</span>
                            </div>
                            <p className="text-gray-600">
                                Empowering universities with efficient course management.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-gray-900 mb-3">Platform</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li>Features</li>
                                <li>Security</li>
                                <li>Pricing</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-gray-900 mb-3">Resources</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li>Documentation</li>
                                <li>Support</li>
                                <li>API</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-gray-900 mb-3">Company</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li>About</li>
                                <li>Contact</li>
                                <li>Privacy</li>
                            </ul>
                        </div>

                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
                        © 2025 University Course Portal. All rights reserved.
                    </div>

                </div>
            </footer>

        </div>
    );
}