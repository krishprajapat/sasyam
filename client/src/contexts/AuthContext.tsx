import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, login as apiLogin, logout as apiLogout } from '../lib/supabase';
import { useLocation } from 'wouter';

type User = {
  id: number;
  username: string;
  isAdmin: boolean;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    // Check if user is already logged in
    async function checkAuthStatus() {
      try {
        setIsLoading(true);
        const response = await getCurrentUser();
        
        if (response.authenticated) {
          setUser(response.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to get user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuthStatus();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      await apiLogin(username, password);
      
      // Refresh user data after login
      const userData = await getCurrentUser();
      
      if (userData.authenticated) {
        setUser(userData.user);
        return { success: true };
      } else {
        return { success: false, message: 'Authentication failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Invalid username or password' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await apiLogout();
      setUser(null);
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}