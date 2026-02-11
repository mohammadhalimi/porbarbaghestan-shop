// back-end/src/controllers/admin.controller.ts
import { Request, Response } from 'express';
import { Admin } from '../models/Admin.model';
import jwt from 'jsonwebtoken';

export class AdminController {
    // Admin Login
    static async login(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body;

            // Validation
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'نام کاربری و رمز عبور الزامی است',
                });
            }

            // Find admin
            const admin = await Admin.findOne({ username });

            if (!admin) {
                return res.status(401).json({
                    success: false,
                    message: 'نام کاربری یا رمز عبور اشتباه است',
                });
            }

            // Check password
            const isPasswordValid = await admin.comparePassword(password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'نام کاربری یا رمز عبور اشتباه است',
                });
            }

            // Update last login
            admin.lastLogin = new Date();
            await admin.save();

            // Generate JWT token
            const token = jwt.sign(
                {
                    id: admin._id.toString(),
                    username: admin.username
                },
                process.env.JWT_SECRET || 'your-secret-key',
                {
                    expiresIn: process.env.JWT_EXPIRE || '7d'
                } as jwt.SignOptions
            );

            // Remove password from response
            const adminData = admin.toObject();
            delete (adminData as any).password;

            // ✅ موفقیت
            return res.status(200).json({
                success: true,
                message: 'ورود موفقیت‌آمیز',
                data: {
                    token,
                    admin: adminData,
                },
            });

        } catch (error) {
            console.error('Login error:', error);

            // ✅ خطای سرور
            return res.status(500).json({
                success: false,
                message: 'خطای سرور',
            });
        }
    }

    // Verify Token
    static async verifyToken(req: Request, res: Response): Promise<Response> {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'توکن یافت نشد',
                });
            }

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'your-secret-key'
            ) as any;

            const admin = await Admin.findById(decoded.id).select('-password');

            if (!admin) {
                return res.status(401).json({
                    success: false,
                    message: 'ادمین یافت نشد',
                });
            }

            // ✅ موفقیت
            return res.status(200).json({
                success: true,
                data: admin,
            });

        } catch (error) {
            // ✅ توکن نامعتبر
            return res.status(401).json({
                success: false,
                message: 'توکن نامعتبر است',
            });
        }
    }

    // Logout
    static async logout(_req: Request, res: Response) {
        res.status(200).json({
            success: true,
            message: 'خروج موفقیت‌آمیز',
        });
    }

    // Create initial admin
    static async createInitialAdmin() {
        try {
            const adminExists = await Admin.findOne({
                username: process.env.ADMIN_USERNAME || 'admin'
            });

            if (!adminExists) {
                const admin = new Admin({
                    username: process.env.ADMIN_USERNAME || 'admin',
                    email: process.env.ADMIN_EMAIL || 'admin@parbarbaghestan.com',
                    password: process.env.ADMIN_PASSWORD || 'admin123',
                });

                await admin.save();
                console.log('✅ Admin created successfully');
                console.log('   Username:', admin.username);
                console.log('   Password:', process.env.ADMIN_PASSWORD || 'admin123');
            }
        } catch (error) {
            console.error('❌ Error creating admin:', error);
        }
    }
}