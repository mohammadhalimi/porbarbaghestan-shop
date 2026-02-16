// app/services/profile.service.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

export interface AdminProfile {
  id: string;
  username: string;
  email: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

class ProfileService {
  private getToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  private getHeaders(): Record<string, string> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = (await response.json()) as ApiResponse<T>;

    if (!response.ok) {
      throw new Error(data.message || 'خطا در ارتباط با سرور');
    }

    if (!data.success) {
      throw new Error(data.message || 'خطا در عملیات');
    }

    if (!data.data) {
      throw new Error('داده‌ای یافت نشد');
    }

    return data.data;
  }

  async getProfile(): Promise<AdminProfile> {
    try {
      const response = await fetch(`${API_URL}/admin/profile`, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include',
      });

      return await this.handleResponse<AdminProfile>(response);
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  async updateProfile(profileData: Partial<AdminProfile>): Promise<AdminProfile> {
    try {
      const response = await fetch(`${API_URL}/admin/profile`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(profileData),
        credentials: 'include',
      });

      const updatedProfile = await this.handleResponse<AdminProfile>(response);

      const userStr = localStorage.getItem('admin_user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          if (updatedProfile.username) user.username = updatedProfile.username;
          if (updatedProfile.email) user.email = updatedProfile.email;
          localStorage.setItem('admin_user', JSON.stringify(user));
        } catch (e) {
          console.error('Error updating localStorage user:', e);
        }
      }

      return updatedProfile;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  async changePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<ChangePasswordResponse> {
    try {
      const response = await fetch(`${API_URL}/admin/profile/change-password`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
        credentials: 'include',
      });

      const data = await response.json() as ApiResponse;

      if (!response.ok) {
        throw new Error(data.message || 'خطا در تغییر رمز عبور');
      }

      if (!data.success) {
        throw new Error(data.message || 'خطا در تغییر رمز عبور');
      }

      return {
        success: data.success,
        message: data.message,
      };
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${API_URL}/admin/logout`, {
        method: 'POST',
        headers: this.getHeaders(),
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
  }

  async verifyToken(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/admin/verify`, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include',
      });

      const data = await response.json() as ApiResponse;
      return data.success === true;
    } catch (error) {
      return false;
    }
  }
}

const profileService = new ProfileService();
export default profileService;