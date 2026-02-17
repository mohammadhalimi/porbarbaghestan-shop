import express from 'express';
import { body } from 'express-validator';
import { ProductController } from '../../controllers/admin/product.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { uploadMultiple } from '../../middleware/upload.middleware';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

// همه روت‌ها نیاز به احراز هویت دارند
router.use(authMiddleware);

// ==================== روت‌های کمکی ====================
router.get('/brands', ProductController.getBrands);
router.get('/types', ProductController.getTypes);
router.get('/sizes/:type', ProductController.getSizesByType);

// ==================== روت‌های اصلی ====================
// دریافت لیست محصولات
router.get('/', ProductController.getAllProducts);

// دریافت یک محصول
router.get('/:id', ProductController.getProduct);

// ایجاد محصول جدید
router.post(
  '/',
  uploadMultiple,
  [
    body('name').notEmpty().withMessage('نام محصول الزامی است').trim(),
    body('brand').isIn(['izirtuland', 'khakshimi']).withMessage('برند معتبر نیست'),
    body('type').isIn(['solid', 'liquid']).withMessage('نوع محصول معتبر نیست'),
    body('sizes').custom((value) => {
      try {
        const sizes = typeof value === 'string' ? JSON.parse(value) : value;
        if (!Array.isArray(sizes) || sizes.length === 0) {
          throw new Error('حداقل یک سایز باید انتخاب شود');
        }
        return true;
      } catch (error) {
        throw new Error('فرمت سایزها نامعتبر است');
      }
    }),
    body('description').notEmpty().withMessage('توضیحات الزامی است').trim(),
  ],
  validateRequest,
  ProductController.createProduct
);

// بروزرسانی محصول
router.put(
  '/:id',
  uploadMultiple,
  [
    body('name').optional().trim(),
    body('brand').optional().isIn(['izirtuland', 'khakshimi']).withMessage('برند معتبر نیست'),
    body('type').optional().isIn(['solid', 'liquid']).withMessage('نوع محصول معتبر نیست'),
    body('description').optional().trim(),
    body('isActive').optional().isBoolean(),
  ],
  validateRequest,
  ProductController.updateProduct
);

// حذف محصول
router.delete('/:id', ProductController.deleteProduct);

export default router;