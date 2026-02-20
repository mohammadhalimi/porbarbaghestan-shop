// front-end/services/blog.service.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface InternalLink {
  productId: string;
  productName: string;
  productSlug?: string;
  anchorText: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string[];
  internalLinks: InternalLink[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  views: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  name: string;
  count: number;
}

class BlogService {
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

  // دریافت لیست مقالات
  async getPosts(params?: {
    page?: number;
    limit?: number;
    tag?: string;
    search?: string;
  }): Promise<{ data: BlogPost[]; pagination: any }> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.tag) queryParams.append('tag', params.tag);
    if (params?.search) queryParams.append('search', params.search);

    const response = await fetch(`${API_URL}/admin/blog?${queryParams}`, {
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در دریافت مقالات');
    }

    return data;
  }

  // دریافت یک مقاله
  async getPost(id: string): Promise<BlogPost> {
    const response = await fetch(`${API_URL}/admin/blog/${id}`, {
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در دریافت مقاله');
    }

    return data.data;
  }

  // ایجاد مقاله جدید
  async createPost(formData: FormData): Promise<BlogPost> {
    const token = this.getToken();

    const response = await fetch(`${API_URL}/admin/blog`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در ایجاد مقاله');
    }

    return data.data;
  }

  // بروزرسانی مقاله
  async updatePost(id: string, formData: FormData): Promise<BlogPost> {
    const token = this.getToken();

    const response = await fetch(`${API_URL}/admin/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در بروزرسانی مقاله');
    }

    return data.data;
  }

  // حذف مقاله
  async deletePost(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/admin/blog/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در حذف مقاله');
    }
  }

  // دریافت تگ‌های محبوب
  async getPopularTags(): Promise<Tag[]> {
    const response = await fetch(`${API_URL}/admin/blog/tags/popular`, {
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در دریافت تگ‌ها');
    }

    return data.data;
  }

  //دریافت پست ها برای داینامیک روت
  async getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await fetch(`${API_URL}/blog/${slug}`, {
      headers: this.getHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطا در دریافت مقاله');
    }

    return data.data;
  }
}

export default new BlogService();