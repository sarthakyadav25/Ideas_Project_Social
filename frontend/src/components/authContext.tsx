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
        const response = await fetch('http://localhost:8000/api/check', {
          method: 'GET',
          credentials: 'include', // Include credentials (e.g., cookies) for cross-origin requests
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.loggedIn); 
          console.log(data.loggedIn)// Set isLoggedIn to the value received from the API
        } else {
          setIsLoggedIn(false); // If the response is not okay, set isLoggedIn to false
        }
      } catch (error) {
        console.error('An error occurred while checking login status:', error);
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
