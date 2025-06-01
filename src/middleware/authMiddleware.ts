import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'AppaandMomo';

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader); // 🔍 Check if header is even coming
  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header missing' });
    return; // just return, no value
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Optionally attach decoded info to req for later use
    (req as any).user = decoded; // TypeScript: you can extend Request type in real app
    next(); // call next() with no return
  } catch (error) {
    console.error('Token verification error:', error); // 🔍 Reason for failure
    res.status(403).json({ error: 'Invalid or expired token' });
    return;
  }
}
