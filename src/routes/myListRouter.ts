import express from 'express';
import {
    addItem,
    listItems,
    removeItem,
} from '../controllers/myListController';
import authMiddleware from '../middleware/authMiddleware';
import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../types/express';

const router = express.Router();

// Add an item to the list
router.post('/my-list', authMiddleware, async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
        const userId = req.user?.id; // Get the user ID from the middleware
        const { itemId, type } = req.body;

        if (!userId || !itemId || !type) {
            return res.status(400).json({ message: 'Invalid request body' });
        }
        const result = await addItem({ userId, itemId, type });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

// List items with pagination
router.get('/my-list', authMiddleware, async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
        const userId = req.user?.id; // Get the user ID from the middleware
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const result = await listItems({ userId, page, limit });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

// Remove an item from the list
router.delete('/my-list/:contentId', authMiddleware, async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
        const userId = req.user?.id; // Get the user ID from the middleware
        const { contentId } = req.params;

        if (!userId || !contentId) {
            return res.status(400).json({ message: 'Invalid request parameters' });
        }

        const result = await removeItem(userId, contentId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
});

export default router;