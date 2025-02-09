"use client";
import { useEffect, useState } from "react";
import ProfileLayout from "../../components/ProfileLayout";


const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <ProfileLayout>
      <div className="bg-white p-6 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome to the Dashboard
        </h1>

        {user ? (
          <div className="space-y-4">
            <div className="text-lg font-semibold">
              {user.first_name} {user.last_name}
            </div>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span> {user.phone_number}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading user details...</p>
        )}
      </div>
    </ProfileLayout>
  );
};

export default Dashboard;
