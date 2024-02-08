import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          setAccessToken(token);
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <AuthContext.Provider value={{ accessToken }}> {/* Provide accessToken value */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;