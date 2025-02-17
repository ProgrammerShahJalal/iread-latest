'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const BASE_URL = process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_BACKEND_LIVE_URL
  : process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }

      const data = await response.json();
      // console.log("Registration successful:", data);

      // Store user info in localStorage
      const {id, first_name, last_name, email, phone_number, slug, photo } = data?.data;
      localStorage.setItem("user", JSON.stringify({ id, first_name, last_name, email, phone_number, slug, photo }));

      router.push(`/login`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
};


  return (
    <div className="bg-slate-200 flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField id="first_name" label="First Name" type="text" value={formData.first_name} onChange={handleChange} required />
          <InputField id="last_name" label="Last Name" type="text" value={formData.last_name} onChange={handleChange} required />
          <InputField id="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} required autoComplete="email" />
          <InputField id="phone_number" label="Phone Number" type="tel" value={formData.phone_number} onChange={handleChange} required />
          <InputField id="password" label="Password" type="password" value={formData.password} onChange={handleChange} required autoComplete="new-password" />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 px-3 py-2 text-white font-semibold shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange, required, autoComplete }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-900">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

export default RegisterPage;
