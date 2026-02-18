// back-end/src/controllers/admin/blog.controller.ts
import { Request, Response } from 'express';
import { BlogPost } from '../../models/BlogPost.model';
import { Product } from '../../models/Product.model';
import { validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';

export class BlogController {
  // دریافت لیست مقالات
  static async getAllPosts(req: Request, res: Response): Promise<Response> {
    try {
      const { page = 1, limit = 10, tag, search } = req.query;
      
      const query: any = {};
      
      if (tag) {
        query.tags = tag;
      }
      
      if (search) {
        query.$text = { $search: search as string };
      }
      
      const skip = (Number(page) - 1) * Number(limit);
      
      const [posts, total] = await Promise.all([
        BlogPost.find(query)
          .sort({ publishedAt: -1 })
          .skip(skip)
          .limit(Number(limit)),
        BlogPost.countDocuments(query),
      ]);

      return res.status(200).json({
        success: true,
        data: posts,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error('Get all posts error:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در دریافت لیست مقالات',
      });
    }
  }

  // دریافت یک مقاله
  static async getPost(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const post = await BlogPost.findById(id);
      
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'مقاله یافت نشد',
        });
      }

      return res.status(200).json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.error('Get post error:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در دریافت مقاله',
      });
    }
  }

  // دریافت مقاله با slug
  static async getPostBySlug(req: Request, res: Response): Promise<Response> {
    try {
      const { slug } = req.params;
      
      const post = await BlogPost.findOne({ slug });
      
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'مقاله یافت نشد',
        });
      }

      // افزایش بازدید
      post.views += 1;
      await post.save();

      return res.status(200).json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.error('Get post by slug error:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در دریافت مقاله',
      });
    }
  }

  // ایجاد مقاله جدید
  static async createPost(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { title, content, excerpt, tags, internalLinks, metaTitle, metaDescription, metaKeywords } = req.body;

      // پردازش تصویر آپلود شده
      let coverImage = '';
      if (req.file) {
        coverImage = `/uploads/blog/${req.file.filename}`;
      } else {
        return res.status(400).json({
          success: false,
          message: 'تصویر شاخص الزامی است',
        });
      }

      // پردازش تگ‌ها
      let parsedTags = [];
      try {
        parsedTags = tags ? (typeof tags === 'string' ? JSON.parse(tags) : tags) : [];
      } catch (error) {
        parsedTags = [];
      }

      // پردازش لینک‌های داخلی
      let parsedInternalLinks = [];
      if (internalLinks) {
        try {
          parsedInternalLinks = typeof internalLinks === 'string' 
            ? JSON.parse(internalLinks) 
            : internalLinks;
          
          // اعتبارسنجی محصولات
          for (const link of parsedInternalLinks) {
            const product = await Product.findById(link.productId);
            if (!product) {
              return res.status(400).json({
                success: false,
                message: `محصول با آیدی ${link.productId} یافت نشد`,
              });
            }
          }
        } catch (error) {
          console.error('Error parsing internal links:', error);
        }
      }

      const post = new BlogPost({
        title,
        content,
        excerpt,
        coverImage,
        tags: parsedTags,
        internalLinks: parsedInternalLinks,
        metaTitle,
        metaDescription,
        metaKeywords,
        publishedAt: new Date(),
      });

      await post.save();

      return res.status(201).json({
        success: true,
        message: 'مقاله با موفقیت ایجاد شد',
        data: post,
      });
    } catch (error) {
      console.error('Create post error:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در ایجاد مقاله',
      });
    }
  }

  // بروزرسانی مقاله
  static async updatePost(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const { title, content, excerpt, tags, internalLinks, metaTitle, metaDescription, metaKeywords } = req.body;

      const post = await BlogPost.findById(id);
      
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'مقاله یافت نشد',
        });
      }

      // پردازش تصویر جدید (اگر آپلود شده باشد)
      let coverImage = post.coverImage;
      if (req.file) {
        // حذف تصویر قدیمی
        const oldImagePath = path.join(__dirname, '../../../', post.coverImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
        coverImage = `/uploads/blog/${req.file.filename}`;
      }

      // پردازش تگ‌ها
      let parsedTags = post.tags;
      if (tags) {
        try {
          parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
        } catch (error) {
          parsedTags = [];
        }
      }

      // پردازش لینک‌های داخلی
      let parsedInternalLinks = post.internalLinks;
      if (internalLinks) {
        try {
          parsedInternalLinks = typeof internalLinks === 'string' 
            ? JSON.parse(internalLinks) 
            : internalLinks;
          
          // اعتبارسنجی محصولات
          for (const link of parsedInternalLinks) {
            const product = await Product.findById(link.productId);
            if (!product) {
              return res.status(400).json({
                success: false,
                message: `محصول با آیدی ${link.productId} یافت نشد`,
              });
            }
          }
        } catch (error) {
          console.error('Error parsing internal links:', error);
        }
      }

      // بروزرسانی مقاله
      const updatedPost = await BlogPost.findByIdAndUpdate(
        id,
        {
          $set: {
            title: title || post.title,
            content: content || post.content,
            excerpt: excerpt || post.excerpt,
            coverImage,
            tags: parsedTags,
            internalLinks: parsedInternalLinks,
            metaTitle: metaTitle || post.metaTitle,
            metaDescription: metaDescription || post.metaDescription,
            metaKeywords: metaKeywords || post.metaKeywords,
          },
        },
        { 
          returnDocument: 'after', 
          runValidators: true 
        }
      );

      return res.status(200).json({
        success: true,
        message: 'مقاله با موفقیت بروزرسانی شد',
        data: updatedPost,
      });
    } catch (error) {
      console.error('Update post error:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در بروزرسانی مقاله',
      });
    }
  }

  // حذف مقاله
  static async deletePost(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const post = await BlogPost.findById(id);
      
      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'مقاله یافت نشد',
        });
      }

      // حذف تصویر
      const imagePath = path.join(__dirname, '../../../', post.coverImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      await BlogPost.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: 'مقاله با موفقیت حذف شد',
      });
    } catch (error) {
      console.error('Delete post error:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در حذف مقاله',
      });
    }
  }

  // دریافت تگ‌های محبوب
  static async getPopularTags(_req: Request, res: Response): Promise<Response> {
    try {
      const tags = await BlogPost.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 },
      ]);

      return res.status(200).json({
        success: true,
        data: tags.map(t => ({ name: t._id, count: t.count })),
      });
    } catch (error) {
      console.error('Get popular tags error:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در دریافت تگ‌ها',
      });
    }
  }
}