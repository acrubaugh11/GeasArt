import { Request, Response } from 'express';
import * as authService from '../services/authService';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'AppaandMomo';

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await authService.validateUser(username, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Create JWT token payload - adjust to your user model
    const tokenPayload = { id: user.id, username: user.username, role: user.role };

    // Sign the JWT token, expire in 1 hour (adjust as needed)
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '2h' });

    // Send the token along with any user info you want to expose
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        // Add more user fields if you want
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
