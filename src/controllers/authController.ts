import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const SECRET_KEY = process.env.JWT_SECRET ?? '';

// Register a new user
export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Error registering user', error });
    }
};

// User login
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create and assign a token
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({ message: 'Error logging in', error });
    }
};