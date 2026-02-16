// app/services/auth.service.ts
export interface AdminUser {
  id: string;
  username: string;
  email: string;
}

class AuthService {
  private baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  setToken(token: string) {
    localStorage.setItem('admin_token', token);
    document.cookie = `admin_token=${token}; path=/; max-age=604800; SameSite=Lax`;
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token');
    }
    return null;
  }

  getUser(): AdminUser | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('admin_user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async login(username: string, password: string) {
    try {
      const response = await fetch(`${this.baseURL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const token = this.getToken();
      await fetch(`${this.baseURL}/admin/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }

  clearAuth() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }

  async verifyToken() {
    const token = this.getToken();
    
    if (!token) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseURL}/admin/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data.success;
    } catch (error) {
      return false;
    }
  }
}

export const authService = new AuthService();
export default authService;