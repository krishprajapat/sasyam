import { useContext } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useAuth as useAuthContext } from '@/contexts/AuthContext';

export function useAuth() {
  const auth = useAuthContext();
  const [, navigate] = useLocation();

  const { isAuthenticated, isAdmin, user, login, logout, isLoading } = auth;

  // Function to require authentication
  const requireAuth = (callback?: () => void) => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin');
      return false;
    }
    
    if (callback && isAuthenticated) {
      callback();
    }
    
    return true;
  };

  // Function to require admin privileges
  const requireAdmin = (callback?: () => void) => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      navigate('/admin');
      return false;
    }
    
    if (callback && isAuthenticated && isAdmin) {
      callback();
    }
    
    return true;
  };

  return {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    login,
    logout,
    requireAuth,
    requireAdmin
  };
}
