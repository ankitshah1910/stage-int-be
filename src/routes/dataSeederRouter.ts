import express from 'express';
import { seedData } from '../controllers/dataSeederController';

const router = express.Router();

// Data seeder route
router.post('/seed-data', seedData);

export default router;
