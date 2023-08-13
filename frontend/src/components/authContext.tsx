import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the type for the children prop
type Props = {
  children: ReactNode;
};

const AuthContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('https://thinkdevs.onrender.com/api/check', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.loggedIn);
          console.log(data.loggedIn);
        } else {
          // Handle non-OK response, e.g., display an error message or handle logout
          console.error('Failed to fetch login status:', response.status);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('An error occurred while checking login status:', error);
        setIsLoggedIn(false);
      }
    };
  
    checkLoginStatus();
  }, []);
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
