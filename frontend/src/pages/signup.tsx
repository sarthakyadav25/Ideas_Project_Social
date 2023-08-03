import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define types for form data and errors
interface FormData {
  email: string;
  username: string;
  password: string;
}

interface Errors {
  email?: string;
  username?: string;
  password?: string;
}

const Signup: React.FC = () => {
  // State to manage form data and errors
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  // Function to handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Basic form validation
    const newErrors: Errors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Make the API call to your Django backend for user signup
      const response = await axios.post('/api/signup', formData);

      console.log(response.data); // Log the API response

      // Show success toast here (not implemented in the simulation)
      toast.success('Account created successfully!');
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(axiosError.response.data); // Log the error response from the API
      } else {
        console.error('Server Error'); // Log a generic server error if response is not available
      }

      // Show error toast here if signup fails (not implemented in the simulation)
      toast.error('Account creation failed. Please try again later.');
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md min-w-[20rem] w-[25rem] sm:w-[full] max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-#f461a8">Register to Think.Devs</h2>
        <div className="space-y-4">
          {/* Signup with Google */}
          <button
            className="flex items-center justify-center w-full py-2.5 px-6 bg-[#000000] text-white rounded-lg"
            onClick={() => alert('Signup with Google clicked!')}
          >
            <FaGoogle className="mr-2" />
            Sign up with Google
          </button>

          {/* Signup with GitHub */}
          <button
            className="flex items-center justify-center w-full py-2.5 px-6 bg-[#000000]  text-white rounded-lg"
            onClick={() => alert('Signup with GitHub clicked!')}
          >
            <FaGithub className="mr-2" />
            Sign up with GitHub
          </button>

          {/* Signup with Custom Fields */}
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

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full border ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                } rounded-lg px-3 py-2 focus:outline-none focus:border-#ec1c92`}
                placeholder="Enter username"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
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

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-br from-[#ec1c92] to-[#e8368f]  shadow-lg text-white rounded-lg"
            >
              Create Account
            </button>
          </form>

          {/* Already have an account? Login */}
          <div className="text-center">
            <p className="text-gray-700">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-600">Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
