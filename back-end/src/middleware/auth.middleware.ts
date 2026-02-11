// back-end/src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.model';

export const authMiddleware = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ success: false, message: 'دسترسی غیرمجاز' });
      return; // ✅ اینجا return خالی
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      res.status(401).json({ success: false, message: 'ادمین یافت نشد' });
      return; // ✅ اینجا return خالی
    }

    (req as any).admin = admin;
    next();

  } catch (error) {
    res.status(401).json({ success: false, message: 'توکن نامعتبر است' });
    return; // ✅ اینجا return خالی
  }
};