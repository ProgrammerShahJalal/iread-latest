"use client";
import { useEffect, useState } from "react";
import ProfileLayout from "../../components/ProfileLayout";
import Image from "next/image";


const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <ProfileLayout>
      <div className="bg-white p-6 my-12 mx-auto max-w-lg rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Profile Settings</h1>

          <div className="flex flex-col items-center space-y-6">
            {/* Profile Image */}
            <div className="relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.photo}`}
                alt="Profile"
                width={64}
                height={64}
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />
              
            </div>

            {/* Profile Details */}
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center gap-5">
              <label className="block">
                <span className="text-gray-700">First Name</span>
                <input
                  type="text"
                  name="first_name"
                  value={user?.first_name || ""}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Last Name</span>
                <input
                  type="text"
                  name="last_name"
                  value={user?.last_name || ""}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              </div>

              <label className="block">
                <span className="text-gray-700">Email</span>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md cursor-not-allowed"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Phone Number</span>
                <input
                  type="text"
                  name="phone_number"
                  value={user?.phone_number || ""}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
            </div>
       
      </div>
      </div>

    </ProfileLayout>
  );
};

export default ProfilePage;
