// back-end/src/routes/public/blog.routes.ts
import express from 'express';
import { BlogController } from '../../controllers/admin/blog.controller';

const router = express.Router();

// ==================== روت‌های عمومی وبلاگ ====================
// دریافت لیست مقالات (برای نمایش در سایت)
router.get('/', BlogController.getAllPosts);

// دریافت یک مقاله با slug
router.get('/:slug', BlogController.getPostBySlug);

export default router;