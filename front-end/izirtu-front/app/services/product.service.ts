const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ProductSize {
  size: '1kg' | '10kg' | '1L' | '5L' | '20L';
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  brand: 'izirtuland' | 'khakshimi';
  type: 'solid' | 'liquid';
  sizes: ProductSize[];
  description: string;
  images: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  value: string;
  label: string;
}

export interface ProductType {
  value: string;
  label: string;
}

export interface SizeOption {
  value: string;
  label: string;
}

class ProductService {
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

  // دریافت لیست محصولات
  async getProducts(params?: {
    page?: number;
    limit?: number;
    brand?: string;
    type?: string;
    search?: string;
  }): Promise<{ data: Product[]; pagination: any }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.brand) queryParams.append('brand', params.brand);
    if (params?.type) queryParams.append('type', params.type);
    if (params?.search) queryParams.append('search', params.search);

    const response = await fetch(`${API_URL}/admin/products?${queryParams}`, {
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در دریافت محصولات');
    }

    return data;
  }

  // دریافت یک محصول
  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/admin/products/${id}`, {
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در دریافت محصول');
    }

    return data.data;
  }

  // ایجاد محصول جدید
  async createProduct(formData: FormData): Promise<Product> {
    const token = this.getToken();
    
    const response = await fetch(`${API_URL}/admin/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در ایجاد محصول');
    }

    return data.data;
  }

  // بروزرسانی محصول
  async updateProduct(id: string, formData: FormData): Promise<Product> {
    const token = this.getToken();
    
    const response = await fetch(`${API_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در بروزرسانی محصول');
    }

    return data.data;
  }

  // حذف محصول
  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در حذف محصول');
    }
  }

  // دریافت برندها
  async getBrands(): Promise<Brand[]> {
    const response = await fetch(`${API_URL}/admin/products/brands`, {
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در دریافت برندها');
    }

    return data.data;
  }

  // دریافت انواع محصول
  async getTypes(): Promise<ProductType[]> {
    const response = await fetch(`${API_URL}/admin/products/types`, {
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در دریافت انواع محصول');
    }

    return data.data;
  }

  // دریافت سایزها بر اساس نوع محصول
  async getSizesByType(type: string): Promise<SizeOption[]> {
    const response = await fetch(`${API_URL}/admin/products/sizes/${type}`, {
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در دریافت سایزها');
    }

    return data.data;
  }
}

export default new ProductService();