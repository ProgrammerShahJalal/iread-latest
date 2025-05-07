"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [userRolesMap, setUserRolesMap] = useState<{ [key: number]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    // Fetch user roles and store them in a map
    fetch(
      `${BASE_URL}/api/v1/user-roles?orderByCol=id&orderByAsc=true&show_active_data=true&paginate=10&select_fields=`
    )
      .then((res) => res.json())
      .then((data) => {
        const roleMap: { [key: number]: string } = {};
        data?.data?.data?.forEach((role: { serial: number; title: string }) => {
          roleMap[role.serial] = role.title;
        });
        setUserRolesMap(roleMap);
      })
      .catch((err) => console.error("Error fetching user roles:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
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
        if (response.status === 403) {
          throw new Error(
            "Your account is blocked due to multiple failed login attempts"
          );
        } else {
          throw new Error("Invalid credentials. Please try again.");
        }
      }

      const data = await response.json();
      
      // Store user info in localStorage
      const {
        id,
        uid,
        first_name,
        last_name,
        email,
        phone_number,
        slug,
        photo,
        role_serial,
        token,
      } = data?.data?.data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          id,
          uid,
          first_name,
          last_name,
          email,
          phone_number,
          slug,
          photo,
          role_serial,
          token,
        })
      );
      toast.success("Login Successful!");
      window.dispatchEvent(new Event("userUpdated"));
      router.push(`/profile?slug=${slug}&uid=${uid}`);
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
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
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
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            error={errors.password}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#202C45] px-3 py-2 text-white font-semibold shadow-md hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202C45]"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Register Now
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

export default LoginPage;
