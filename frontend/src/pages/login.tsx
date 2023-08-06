import React, { useState, ChangeEvent, FormEvent, SyntheticEvent } from 'react';
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
  username?: string;
  password?: string;
}

const Login: React.FC = () => {
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  

  // Function to handle form submission
  const handleSubmit = async (e: SyntheticEvent)=> {
    e.preventDefault();

    // Basic form validation
    const newErrors: Errors = {};
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

    // POST form data to API endpoint
    await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });
    console.log(JSON.stringify({ username, password }));
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
              <label htmlFor="username" className="block font-medium text-gray-700">
                Email
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
                placeholder="Enter your email"
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
