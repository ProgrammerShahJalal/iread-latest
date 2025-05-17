"use client";
export const dynamic = "force-dynamic";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import ProfileLayout from "../../components/ProfileLayout";
import axios from "axios";
import apiClient from "../../lib/apiClient";


interface User {
  id: number;
  uid: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  photo: string;
}

// Define the expected API response type
interface SiteResponse {
  data?: {
    value: string;
  };
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [grettingMessage, setGrettingMessage] = useState<SiteResponse | null>(null);


  const BASE_URL = apiClient.defaults.baseURL;


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    }
  }, []);


    useEffect(() => {
      const endpoints = [
        { key: 'title/Gretting Message', setter: setGrettingMessage },
      ];
    
      const fetchSettings = async () => {
        try {
          const responses = await Promise.all(
            endpoints.map(({ key }) =>
              axios.get(`${BASE_URL}/api/v1/app-setting-values/${key}`)
            )
          );
          responses.forEach((response, index) => {
            endpoints[index].setter(response.data);
          });
        } catch (error) {
          console.error("Error fetching settings:", error);
        }
      };
    
      fetchSettings();
    }, [BASE_URL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (formData) {
          setFormData({ ...formData, photo: event.target?.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <ProfileLayout>
      <div className="bg-white p-6 my-12 mx-auto max-w-4xl rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Profile Information</h1>
          <p className="text-center">{grettingMessage?.data?.value}</p>
        {user ? (
          <div className="flex flex-col items-center space-y-6">
            <input
              type="hidden"
              name="id"
              defaultValue={user.id}
            />
            {/* Profile Image */}
            <div className="relative flex flex-col items-center">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  width={300}
                  height={300}
                  className="w-20 h-20 object-center rounded-full shadow-md"
                />
              ) : (
                <Image
                  src={`${BASE_URL}/${formData?.photo || user?.photo}`}
                  alt="Profile"
                  width={300}
                  height={300}
                  className="w-20 h-20 rounded-full object-cover border border-gray-300"
                />
              )}
              {editMode && (
                <div className="text-center mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <button
                    type="button"
                    className="px-4 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Photo
                  </button>
                </div>
              )}
            </div>


            {/* Profile Details */}
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center gap-5">
                <label className="block w-full">
                  <span className="text-gray-700">First Name</span>
                  <input
                    type="text"
                    name="first_name"
                    value={formData?.first_name ?? ""}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </label>

                <label className="block w-full">
                  <span className="text-gray-700">Last Name</span>
                  <input
                    type="text"
                    name="last_name"
                    value={formData?.last_name ?? ""}
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
                  readOnly
                  disabled
                  className="w-full p-2 border border-gray-300 bg-gray-100 rounded-md cursor-not-allowed"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Phone Number</span>
                <input
                  type="text"
                  name="phone_number"
                  value={formData?.phone_number ?? ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading user details...</p>
        )}
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;
