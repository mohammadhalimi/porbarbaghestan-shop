import fs from 'fs';
import path from 'path';

export const initUploadDirectories = () => {
  const dirs = [
    'uploads',
    'uploads/products',
    'uploads/avatars',
    'uploads/blog',
    'uploads/misc'
  ];

  dirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
  
  console.log('✅ Upload directories ready');
};