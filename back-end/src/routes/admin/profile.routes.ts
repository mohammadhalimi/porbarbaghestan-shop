import express from 'express';
import { body } from 'express-validator';
import { AdminProfileController } from '../../controllers/admin/profile.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

// همه روت‌ها نیاز به احراز هویت دارند
router.use(authMiddleware);

// دریافت پروفایل
router.get('/', AdminProfileController.getProfile);

// بروزرسانی پروفایل (فقط username و email)
router.put(
  '/',
  [
    body('username').optional().trim().isLength({ min: 3 }).withMessage('نام کاربری باید حداقل ۳ کاراکتر باشد'),
    body('email').optional().isEmail().withMessage('ایمیل معتبر نیست'),
  ],
  validateRequest,
  AdminProfileController.updateProfile
);

// تغییر رمز عبور
router.post(
  '/change-password',
  [
    body('currentPassword').notEmpty().withMessage('رمز عبور فعلی الزامی است'),
    body('newPassword').isLength({ min: 6 }).withMessage('رمز عبور جدید باید حداقل ۶ کاراکتر باشد'),
    body('confirmPassword').notEmpty().withMessage('تکرار رمز عبور الزامی است'),
  ],
  validateRequest,
  AdminProfileController.changePassword
);

export default router;