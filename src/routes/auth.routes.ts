import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error or email already exists
 */
router.post('/register', validate(registerSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: { email, name, password: hashedPassword },
        });

        const token = generateToken({ id: user.id, email: user.email });

        res.status(201).json({
            user: { id: user.id, email: user.email, name: user.name },
            token,
        });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validate(loginSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken({ id: user.id, email: user.email });

        res.json({
            user: { id: user.id, email: user.email, name: user.name },
            token,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
