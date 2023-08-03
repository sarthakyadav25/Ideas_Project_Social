import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define types for form data and errors
interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  // State to manage form data and errors
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  // Function to handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Basic form validation
    const newErrors: Errors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Make the API call to your Django backend for user login
      const response = await axios.post('/api/login', formData);

      console.log(response.data); // Log the API response

      // Show success toast here (not implemented in the simulation)
      toast.success('Logged in successfully!');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(axiosError.response.data); // Log the error response from the API
      } else {
        console.error('Server Error'); // Log a generic server error if response is not available
      }

      // Show error toast here if login fails (not implemented in the simulation)
      toast.error('Login failed. Please try again later.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-#f72585 to-#480ca8 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md min-w-[20rem] w-[25rem] sm:w-[full] max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-#f461a8">Login</h2>
        <div className="space-y-4">
          {/* Login with Google */}
          <button
            className="flex items-center justify-center w-full py-2.5 px-6 bg-black text-white rounded-lg"
            onClick={() => alert('Login with Google clicked!')}
          >
            Login with Google
          </button>

          {/* Login with GitHub */}
          <button
            className="flex items-center justify-center w-full py-2.5 px-6 bg-black text-white rounded-lg"
            onClick={() => alert('Login with GitHub clicked!')}
          >
            Login with GitHub
          </button>

          {/* Login with Custom Fields */}
          <form className="space-y-4" onSubmit={handleSubmit} method="post">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg px-3 py-2 focus:outline-none focus:border-#ec1c92`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg px-3 py-2 focus:outline-none focus:border-#ec1c92`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-br from-[#ec1c92] to-[#e8368f] text-white rounded-lg"
            >
              Login
            </button>
          </form>

          {/* Don't have an account? Signup */}
          <div className="text-center">
            <p className="text-gray-700">
              Don't have an account?{' '}
              <Link href="/signup"className="text-primary-600">Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
