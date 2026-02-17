import { Request, Response } from 'express';
import { Product } from '../../models/Product.model';
import { validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';

export class ProductController {
  // دریافت لیست محصولات
  static async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const { page = 1, limit = 10, brand, type, search } = req.query;
      
      const query: any = { isActive: true };
      
      if (brand) {
        query.brand = brand;
      }
      
      if (type) {
        query.type = type;
      }
      
      if (search) {
        query.$text = { $search: search as string };
      }
      
      const skip = (Number(page) - 1) * Number(limit);
      
      const [products, total] = await Promise.all([
        Product.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit)),
        Product.countDocuments(query),
      ]);

      return res.status(200).json({
        success: true,
        data: products,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error('Get all products error:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در دریافت لیست محصولات',
      });
    }
  }

  // دریافت یک محصول
  static async getProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'محصول یافت نشد',
        });
      }

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.error('Get product error:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در دریافت محصول',
      });
    }
  }

  // ایجاد محصول جدید
  static async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { name, brand, type, sizes, description } = req.body;

      // پردازش تصاویر آپلود شده
      const images = (req.files as Express.Multer.File[])?.map(
        file => `/uploads/products/${file.filename}`
      ) || [];

      if (images.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'حداقل یک تصویر برای محصول الزامی است',
        });
      }

      // پردازش سایزها
      let parsedSizes = [];
      try {
        parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'فرمت سایزها نامعتبر است',
        });
      }

      // اعتبارسنجی سایزها بر اساس نوع محصول
      const validSizes = type === 'solid' ? ['1kg', '10kg'] : ['1L', '5L', '20L'];
      for (const size of parsedSizes) {
        if (!validSizes.includes(size.size)) {
          return res.status(400).json({
            success: false,
            message: `سایز ${size.size} برای محصول ${type} معتبر نیست`,
          });
        }
      }

      const product = new Product({
        name,
        brand,
        type,
        sizes: parsedSizes,
        description,
        images,
      });

      await product.save();

      return res.status(201).json({
        success: true,
        message: 'محصول با موفقیت ایجاد شد',
        data: product,
      });
    } catch (error) {
      console.error('Create product error:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در ایجاد محصول',
      });
    }
  }

  // بروزرسانی محصول
  static async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const { name, brand, type, sizes, description, isActive } = req.body;

      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'محصول یافت نشد',
        });
      }

      // پردازش تصاویر جدید (اگر آپلود شده باشند)
      let images = product.images;
      if (req.files && (req.files as Express.Multer.File[]).length > 0) {
        // حذف تصاویر قدیمی
        for (const imagePath of product.images) {
          const fullPath = path.join(__dirname, '../../../', imagePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        }
        
        // اضافه کردن تصاویر جدید
        images = (req.files as Express.Multer.File[]).map(
          file => `/uploads/products/${file.filename}`
        );
      }

      // پردازش سایزها
      let parsedSizes = product.sizes;
      if (sizes) {
        try {
          parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: 'فرمت سایزها نامعتبر است',
          });
        }

        // اعتبارسنجی سایزها بر اساس نوع محصول
        const productType = type || product.type;
        const validSizes = productType === 'solid' ? ['1kg', '10kg'] : ['1L', '5L', '20L'];
        for (const size of parsedSizes) {
          if (!validSizes.includes(size.size)) {
            return res.status(400).json({
              success: false,
              message: `سایز ${size.size} برای محصول ${productType} معتبر نیست`,
            });
          }
        }
      }

      // بروزرسانی محصول
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          $set: {
            name: name || product.name,
            brand: brand || product.brand,
            type: type || product.type,
            sizes: parsedSizes,
            description: description || product.description,
            images,
            isActive: isActive !== undefined ? isActive : product.isActive,
          },
        },
        { returnDocument: 'after', runValidators: true }
      );

      return res.status(200).json({
        success: true,
        message: 'محصول با موفقیت بروزرسانی شد',
        data: updatedProduct,
      });
    } catch (error) {
      console.error('Update product error:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در بروزرسانی محصول',
      });
    }
  }

  // حذف محصول (soft delete)
  static async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'محصول یافت نشد',
        });
      }

      // soft delete
      product.isActive = false;
      await product.save();

      return res.status(200).json({
        success: true,
        message: 'محصول با موفقیت حذف شد',
      });
    } catch (error) {
      console.error('Delete product error:', error);
      return res.status(500).json({
        success: false,
        message: 'خطا در حذف محصول',
      });
    }
  }

  // دریافت برندها
  static async getBrands(_req: Request, res: Response): Promise<Response> {
    return res.status(200).json({
      success: true,
      data: [
        { value: 'izirtuland', label: 'ایزیرتو لند' },
        { value: 'khakshimi', label: 'خاکشیمی' },
      ],
    });
  }

  // دریافت انواع محصول
  static async getTypes(_req: Request, res: Response): Promise<Response> {
    return res.status(200).json({
      success: true,
      data: [
        { value: 'solid', label: 'جامد' },
        { value: 'liquid', label: 'مایع' },
      ],
    });
  }

  // دریافت سایزهای موجود بر اساس نوع محصول
  static async getSizesByType(req: Request, res: Response): Promise<Response> {
    const { type } = req.params;
    
    const sizes = type === 'solid' 
      ? [
          { value: '1kg', label: '۱ کیلوگرمی' },
          { value: '10kg', label: '۱۰ کیلوگرمی' },
        ]
      : [
          { value: '1L', label: '۱ لیتری' },
          { value: '5L', label: '۵ لیتری' },
          { value: '20L', label: '۲۰ لیتری' },
        ];

    return res.status(200).json({
      success: true,
      data: sizes,
    });
  }
}