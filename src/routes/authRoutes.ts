// routes/authRoutes.ts
import express from 'express';
import { login } from '../controllers/authController';

const router = express.Router();

router.post('/login', (req, res, next) => {
    login(req, res).catch(next);
});

export default router;