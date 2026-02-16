// back-end/src/middleware/validateRequest.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'خطا در اعتبارسنجی داده‌های ورودی',
      errors: errors.array().map(err => ({
        field: (err as any).path || (err as any).param || 'unknown',
        message: err.msg
      }))
    });
    
    return;
  }
  
  next();
};