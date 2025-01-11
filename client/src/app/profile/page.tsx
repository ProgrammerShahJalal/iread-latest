import React from 'react';

function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            {/* Profile Header */}
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-blue-600">My Profile</h1>
                <p className="text-gray-700 mt-2">Manage your account details and preferences</p>
            </div>

            {/* Profile Information Section */}
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 space-y-4">
                {/* Personal Details */}
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                            value="John Doe"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value="john.doe@example.com"
                            readOnly
                        />
                    </div>
                </div>

                {/* Account Settings */}
                <h2 className="text-xl font-semibold text-gray-800">Account Settings</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value="********"
                            readOnly
                        />
                        <button className="mt-2 text-blue-600 underline">Change Password</button>
                    </div>
                    <div>
                        <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200">
                            Deactivate Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Activity Summary Section */}
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-800">Activity Summary</h2>
                <ul className="list-disc pl-5 mt-4 text-gray-700">
                    <li>Enrolled in 5 courses</li>
                    <li>Completed 3 courses</li>
                    <li>Participated in 2 events</li>
                    <li>Posted 10 comments on blogs</li>
                </ul>
            </div>
        </div>
    );
}

export default ProfilePage;
