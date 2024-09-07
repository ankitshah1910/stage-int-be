import express from 'express';
import myListRoutes from './myListRouter';
import authRoutes from './authRoutes';
import dataSeederRoutes from './dataSeederRouter';
import mediaRouter from './mediaRouter';

const router = express.Router();

router.use('/auth', authRoutes); // Use authentication routes
router.use('/me', myListRoutes); // Use my list routes
router.use('/media', mediaRouter);
router.use('/seed', dataSeederRoutes); // Use seeder routes

export default router;
