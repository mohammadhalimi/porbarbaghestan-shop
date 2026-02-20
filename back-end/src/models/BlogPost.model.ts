// back-end/src/models/BlogPost.model.ts
import mongoose, { Schema, Document } from 'mongoose';

// اینترفیس برای لینک‌های داخلی
export interface IInternalLink {
  productId: mongoose.Types.ObjectId;
  productName: string;
  productSlug?: string;
  anchorText: string;
}

// اینترفیس اصلی پست وبلاگ
export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string[];
  internalLinks: IInternalLink[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  views: number;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: [true, 'عنوان مقاله الزامی است'],
      trim: true,
    },
    slug: {
      type: String,
    //   required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'محتوای مقاله الزامی است'],
    },
    excerpt: {
      type: String,
      required: [true, 'خلاصه مقاله الزامی است'],
      maxlength: [200, 'خلاصه مقاله نباید بیشتر از ۲۰۰ کاراکتر باشد'],
    },
    coverImage: {
      type: String,
      required: [true, 'تصویر شاخص الزامی است'],
    },
    author: {
      type: String,
      default: 'ادمین',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    internalLinks: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productSlug: String,
        anchorText: {
          type: String,
          required: true,
        },
      },
    ],
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [60, 'عنوان متا نباید بیشتر از ۶۰ کاراکتر باشد'],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'توضیحات متا نباید بیشتر از ۱۶۰ کاراکتر باشد'],
    },
    metaKeywords: {
      type: String,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// ایجاد slug از عنوان قبل از ذخیره
BlogPostSchema.pre('save', function() {
  const post = this as any;
  
  if (post.isModified('title')) {
    post.slug = post.title
      .toLowerCase()
      .replace(/[^\w\u0600-\u06FF\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  if (!post.metaTitle) {
    post.metaTitle = post.title;
  }
  
  if (!post.metaDescription) {
    post.metaDescription = post.excerpt;
  }
});
// ایندکس برای جستجو
BlogPostSchema.index({ title: 'text', content: 'text', tags: 'text' });
// BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ publishedAt: -1 });

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);