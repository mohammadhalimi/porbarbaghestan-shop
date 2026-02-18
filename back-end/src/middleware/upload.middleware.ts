// back-end/src/middleware/upload.middleware.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// اطمینان از وجود پوشه‌های آپلود
const ensureUploadDirExists = (dir: string) => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`📁 Created directory: ${fullPath}`);
  }
};

// ایجاد پوشه‌های مورد نیاز
const uploadDirs = [
  'uploads/products',
  'uploads/blog',
  'uploads/avatars',
  'uploads/misc'
];

uploadDirs.forEach(dir => ensureUploadDirExists(dir));

// تنظیمات ذخیره‌سازی
const storage = multer.diskStorage({
  destination: (req: Request, _file: Express.Multer.File, cb) => {
    let uploadPath = 'uploads/';
    
    // تشخیص مسیر بر اساس نوع درخواست
    if (req.baseUrl?.includes('products')) {
      uploadPath += 'products/';
    } else if (req.baseUrl?.includes('blog')) {
      uploadPath += 'blog/';
    } else if (req.baseUrl?.includes('profile') || req.baseUrl?.includes('avatar')) {
      uploadPath += 'avatars/';
    } else {
      uploadPath += 'misc/';
    }
    
    // اطمینان از وجود پوشه
    ensureUploadDirExists(uploadPath);
    
    cb(null, uploadPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    
    // تشخیص نوع فایل برای نام‌گذاری
    let prefix = 'file';
    if (req.baseUrl?.includes('products')) {
      prefix = 'product';
    } else if (req.baseUrl?.includes('blog')) {
      prefix = 'blog';
    } else if (req.baseUrl?.includes('profile')) {
      prefix = 'avatar';
    }
    
    const filename = `${prefix}-${uniqueSuffix}${ext}`;
    cb(null, filename);
  }
});

// فیلتر تصاویر
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('فرمت فایل نامعتبر است. فقط تصاویر JPEG, PNG, WebP, GIF مجاز هستند.'));
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

// Middleware برای آپلود تک فایل (برای محصولات)
export const uploadSingle = upload.single('image');

// Middleware برای آپلود تصویر شاخص وبلاگ
export const uploadBlogImage = upload.single('image');

// Middleware برای آپلود آواتار
export const uploadAvatar = upload.single('avatar');