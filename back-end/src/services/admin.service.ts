// back-end/src/services/admin.service.ts
import { Admin } from '../models/Admin.model';

export const createInitialAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    
    if (adminCount === 0) {
      const admin = new Admin({
        username: process.env.ADMIN_USERNAME || 'admin',
        email: process.env.ADMIN_EMAIL || 'admin@parbarbaghestan.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
      });

      await admin.save();
      console.log('✅ Admin created successfully');
    }
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  }
};