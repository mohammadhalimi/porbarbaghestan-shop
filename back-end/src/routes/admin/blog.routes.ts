// back-end/src/routes/admin/blog.routes.ts
import express from 'express';
import { body } from 'express-validator';
import { BlogController } from '../../controllers/admin/blog.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { uploadSingle } from '../../middleware/upload.middleware';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

// همه روت‌ها نیاز به احراز هویت دارند
router.use(authMiddleware);

// ==================== روت‌های کمکی ====================
router.get('/tags/popular', BlogController.getPopularTags);

// ==================== روت‌های اصلی ====================
// دریافت لیست مقالات
router.get('/', BlogController.getAllPosts);

// دریافت یک مقاله
router.get('/:id', BlogController.getPost);

// ایجاد مقاله جدید
router.post(
  '/',
  uploadSingle,
  [
    body('title').notEmpty().withMessage('عنوان الزامی است').trim(),
    body('content').notEmpty().withMessage('محتوای مقاله الزامی است'),
    body('excerpt').notEmpty().withMessage('خلاصه مقاله الزامی است').isLength({ max: 200 }),
    body('metaTitle').optional().isLength({ max: 60 }).withMessage('عنوان متا نباید بیشتر از ۶۰ کاراکتر باشد'),
    body('metaDescription').optional().isLength({ max: 160 }).withMessage('توضیحات متا نباید بیشتر از ۱۶۰ کاراکتر باشد'),
  ],
  validateRequest,
  BlogController.createPost
);

// بروزرسانی مقاله
router.put(
  '/:id',
  uploadSingle,
  [
    body('title').optional().trim(),
    body('content').optional(),
    body('excerpt').optional().isLength({ max: 200 }),
    body('metaTitle').optional().isLength({ max: 60 }),
    body('metaDescription').optional().isLength({ max: 160 }),
  ],
  validateRequest,
  BlogController.updatePost
);

// حذف مقاله
router.delete('/:id', BlogController.deletePost);

export default router;