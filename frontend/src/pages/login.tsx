import React, { useState, SyntheticEvent } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import  {useAuth}  from '@/components/authContext';
import Cookies from 'js-cookie';
interface Errors {
  username?: string;
  password?: string;
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const { isLoggedIn, setIsLoggedIn } = useAuth(); // Use the useAuth hook
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

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

    try {
      const response = await fetch('https://thinkdevs.onrender.com/api/login', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
    
      const responseData = await response.json(); // Parse the response data
      if (!response.ok) {
        toast.error(`${responseData.message}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } else {
        setIsLoggedIn(true);
        toast.success('Login successful!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
    
        const jwtToken = responseData.access; // Get the JWT token from the response data
        Cookies.set('access_token', jwtToken);
        document.cookie = `access_token=${jwtToken}; path=/; secure=true; samesite=lax`;
        router.push('/');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-#f72585 to-#480ca8 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md min-w-[20rem] w-[25rem] sm:w-[full] max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-#f461a8">Login</h2>
        <div className="space-y-4">
      
          {/* Login with Custom Fields */}
          <form className="space-y-4" onSubmit={handleSubmit} method="post">
            {/* Email Field */}
            <div>
              <label htmlFor="username" className="block font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full border ${errors.username ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg px-3 py-2 focus:outline-none focus:border-#ec1c92`}
                placeholder="Enter your username"
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
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'
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
          <ToastContainer />

          {/* Don't have an account? Signup */}
          <div className="text-center">
            <p className="text-gray-700">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary-600">Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
