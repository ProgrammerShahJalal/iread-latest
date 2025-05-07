'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
}

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
  const [errors, setErrors] = useState<FormErrors>({}); // Changed from error string to errors object

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        if (errorData) {
          // Handle validation errors (422 status)
          if (response.status === 422 && errorData.data?.length > 0) {
            // Transform validation errors into field-specific errors
            const newErrors: FormErrors = {};
            errorData.data.forEach((error: any) => {
              const fieldName = error.path;
              const cleanMsg = error.msg.replace(/<[^>]*>/g, '');
              newErrors[fieldName as keyof FormErrors] = cleanMsg;
            });
            setErrors(newErrors);
            return; // Don't proceed with success flow
          }
          // Use the general message if available
          else if (errorData.message) {
            toast.error(errorData.message);
            return;
          }
        }
        // Fallback to status-based messages
        throw new Error("Registration failed. Please try again.");
      }

      const data = await response.json();
      
      // Store user info in localStorage
      const { id, uid, first_name, last_name, email, phone_number, slug, photo } = data?.data;
      localStorage.setItem(
        "user", 
        JSON.stringify({ id, uid, first_name, last_name, email, phone_number, slug, photo })
      );

      router.push(`/login`);
      toast.success('Registration Successful!');
    } catch (err: any) {
      toast.error(err.message);
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField 
            id="first_name" 
            label="First Name" 
            type="text" 
            value={formData.first_name} 
            onChange={handleChange} 
            error={errors.first_name}
          />
          <InputField 
            id="last_name" 
            label="Last Name" 
            type="text" 
            value={formData.last_name} 
            onChange={handleChange} 
            error={errors.last_name}
          />
          <InputField 
            id="email" 
            label="Email Address" 
            type="email" 
            value={formData.email} 
            onChange={handleChange} 
            autoComplete="email"
            error={errors.email}
          />
          <InputField 
            id="phone_number" 
            label="Phone Number" 
            type="tel" 
            value={formData.phone_number} 
            onChange={handleChange} 
            error={errors.phone_number}
          />
          <InputField 
            id="password" 
            label="Password" 
            type="password" 
            value={formData.password} 
            onChange={handleChange} 
            autoComplete="new-password"
            error={errors.password}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#202C45] px-3 py-2 text-white font-semibold shadow-md hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202C45]"
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
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  id, 
  label, 
  type, 
  value, 
  onChange, 
  required, 
  autoComplete,
  error 
}) => (
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
      className={`mt-2 block w-full rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-gray-900 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
);

export default RegisterPage;
