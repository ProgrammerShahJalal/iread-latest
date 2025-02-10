"use client";
import { useEffect, useState } from "react";
import ProfileLayout from "../../components/ProfileLayout";
import Image from "next/image";


const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (formData) {
          setFormData({ ...formData, photo: event.target?.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (formData) {
      setUser(formData);
      localStorage.setItem("user", JSON.stringify(formData));
      setEditMode(false);
    }
  };

  return (
    <ProfileLayout>
      <div className="bg-white p-6 my-12 mx-auto max-w-lg rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Profile Settings</h1>

        {user ? (
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Image */}
            <div className="relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${formData?.photo}`|| `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.photo}`}
                alt="Profile"
                width={64}
                height={64}
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              )}
            </div>

            {/* Profile Details */}
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center gap-5">
              <label className="block">
                <span className="text-gray-700">First Name</span>
                <input
                  type="text"
                  name="first_name"
                  value={formData?.first_name || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Last Name</span>
                <input
                  type="text"
                  name="last_name"
                  value={formData?.last_name || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              </div>

              <label className="block">
                <span className="text-gray-700">Email</span>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md cursor-not-allowed"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Phone Number</span>
                <input
                  type="text"
                  name="phone_number"
                  value={formData?.phone_number || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
            </div>

            {/* Buttons */}
            {editMode ? (
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading user details...</p>
        )}
      </div>
    </ProfileLayout>
  );
};

export default Dashboard;
