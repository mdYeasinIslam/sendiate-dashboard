import React from "react";

const LoginPage = () => {
    return (
        <div className="flex container mx-auto h-screen">
            {/* Left Side - Image */}
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
                {/* You can replace '/path-to-your-image.jpg' with the actual image path */}
            </div>

            {/* Right Side - Login Form */}
            <div className="w-1/2 flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                    <form>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;