// app/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import authService, { AdminUser } from '../services/auth.service';

export const useAuth = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      
      if (token) {
        const isValid = await authService.verifyToken();
        
        if (isValid) {
          const userData = authService.getUser();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          authService.clearAuth();
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await authService.login(username, password);
      
      if (response.success) {
        authService.setToken(response.data.token);
        localStorage.setItem('admin_user', JSON.stringify(response.data.admin));
        setUser(response.data.admin);
        setIsAuthenticated(true);
        return { success: true };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: 'خطا در ارتباط با سرور' };
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };
};