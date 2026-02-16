import { AdminUser } from './auth.service';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// تایپ پاسخ API
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

class ProfileService {
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token');
    }
    return null;
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

  // دریافت پروفایل
  async getProfile(): Promise<AdminUser> {
    try {
      const response = await fetch(`${API_URL}/admin/profile`, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include',
      });

      return await this.handleResponse<AdminUser>(response);
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  // بروزرسانی پروفایل
  async updateProfile(profileData: Partial<AdminUser>): Promise<AdminUser> {
    try {
      const response = await fetch(`${API_URL}/admin/profile`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(profileData),
        credentials: 'include',
      });

      const updatedProfile = await this.handleResponse<AdminUser>(response);

      // بروزرسانی اطلاعات ذخیره شده در localStorage
      if (typeof window !== 'undefined') {
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
      }

      return updatedProfile;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // تغییر رمز عبور
  async changePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_URL}/admin/profile/change-password`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ 
          currentPassword, 
          newPassword, 
          confirmPassword 
        }),
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
}

// ایجاد یک نمونه و export کردن آن
const profileService = new ProfileService();
export default profileService;