// back-end/src/controllers/admin/profile.controller.ts
import { Request, Response } from 'express';
import { Admin } from '../../models/Admin.model';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

export class AdminProfileController {
    // دریافت پروفایل
    static async getProfile(req: Request, res: Response): Promise<Response> {
        try {
            const adminId = (req as any).admin.id;

            const admin = await Admin.findById(adminId).select('-password');

            if (!admin) {
                return res.status(404).json({
                    success: false,
                    message: 'ادمین یافت نشد'
                });
            }

            return res.status(200).json({
                success: true,
                data: admin
            });
        } catch (error) {
            console.error('Get profile error:', error);
            return res.status(500).json({
                success: false,
                message: 'خطا در دریافت اطلاعات'
            });
        }
    }

    // بروزرسانی پروفایل
    static async updateProfile(req: Request, res: Response): Promise<Response> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const adminId = (req as any).admin.id;
            const { username, email } = req.body;

            // بررسی تکراری نبودن username
            if (username) {
                const existingAdmin = await Admin.findOne({
                    username,
                    _id: { $ne: adminId }
                });
                if (existingAdmin) {
                    return res.status(400).json({
                        success: false,
                        message: 'این نام کاربری قبلاً استفاده شده است'
                    });
                }
            }

            // بررسی تکراری نبودن email
            if (email) {
                const existingAdmin = await Admin.findOne({
                    email,
                    _id: { $ne: adminId }
                });
                if (existingAdmin) {
                    return res.status(400).json({
                        success: false,
                        message: 'این ایمیل قبلاً استفاده شده است'
                    });
                }
            }

            const updateData: any = {};
            if (username) updateData.username = username;
            if (email) updateData.email = email;


            const updatedAdmin = await Admin.findByIdAndUpdate(
                adminId,
                { $set: updateData },
                { returnDocument: 'after', runValidators: true }
            ).select('-password');

            return res.status(200).json({
                success: true,
                message: 'پروفایل با موفقیت بروزرسانی شد',
                data: updatedAdmin
            });
        } catch (error) {
            console.error('Update profile error:', error);
            return res.status(500).json({
                success: false,
                message: 'خطا در بروزرسانی پروفایل'
            });
        }
    }

    // تغییر رمز عبور
    static async changePassword(req: Request, res: Response): Promise<Response> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }

            const adminId = (req as any).admin.id;
            const { currentPassword, newPassword, confirmPassword } = req.body;

            // بررسی تطابق رمز جدید و تکرار آن
            if (newPassword !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'رمز عبور جدید و تکرار آن مطابقت ندارند'
                });
            }

            // دریافت ادمین با رمز عبور
            const admin = await Admin.findById(adminId);
            if (!admin) {
                return res.status(404).json({
                    success: false,
                    message: 'ادمین یافت نشد'
                });
            }

            // بررسی رمز عبور فعلی
            const isPasswordValid = await admin.comparePassword(currentPassword);
            if (!isPasswordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'رمز عبور فعلی اشتباه است'
                });
            }

            // هش کردن رمز جدید
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // ذخیره رمز جدید
            admin.password = hashedPassword;
            await admin.save();

            return res.status(200).json({
                success: true,
                message: 'رمز عبور با موفقیت تغییر یافت'
            });
        } catch (error) {
            console.error('Change password error:', error);
            return res.status(500).json({
                success: false,
                message: 'خطا در تغییر رمز عبور'
            });
        }
    }
}