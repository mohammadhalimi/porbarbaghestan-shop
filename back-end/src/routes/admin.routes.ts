// back-end/src/routes/admin.routes.ts
import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/login', AdminController.login);
router.post('/logout', AdminController.logout);

// Protected routes
router.get('/verify', authMiddleware, AdminController.verifyToken);

export default router;