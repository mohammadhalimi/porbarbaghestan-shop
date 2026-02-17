// back-end/src/middleware/upload.middleware.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// اطمینان از وجود پوشه آپلود
const uploadDir = 'uploads/products';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// تنظیمات ذخیره‌سازی
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `product-${uniqueSuffix}${ext}`);
  }
});

// فیلتر تصاویر
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('فقط فایل‌های تصویری مجاز هستند'));
  }
};

// تنظیمات آپلود
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Middleware برای آپلود چند فایل
export const uploadMultiple = upload.array('images', 5);

// Middleware برای آپلود تک فایل
export const uploadSingle = upload.single('image');