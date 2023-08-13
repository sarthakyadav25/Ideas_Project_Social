import React, { useState, ChangeEvent, FormEvent, SyntheticEvent } from 'react';
import Link from 'next/link';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

// Define types for errors
interface Errors {
  email?: string;
  username?: string;
  password?: string;
}

const Signup = () => {
  // State to manage form data and errors
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (e: SyntheticEvent)=> {
    e.preventDefault();

    // Basic form validation
    const newErrors: Errors = {};
    if (!email) {
      newErrors.email = 'Email is required.';
    }
    if (!username) {
      newErrors.username = 'Username is required.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response= await fetch('https://thinkdevs.onrender.com/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.ok) {
        // Show the success toast
        toast.success('Signup successful!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000, // Toast will be automatically closed after 2 seconds
        });

      // Redirect to the login page
        router.push('/login');
    }
    console.log({ username, email, password});
  };

  return (
    <div className=" min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-md min-w-[20rem] w-[25rem] sm:w-[full] max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-#f461a8">Register to Think.Devs</h2>
        

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
                value={email}
                onChange={e=>setEmail(e.target.value)}
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
                value={username}
                onChange={e=>setUsername(e.target.value)}
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
                value={password}
                onChange={e=>setPassword(e.target.value)}
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
          <ToastContainer />

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
  );
};

export default Signup;
