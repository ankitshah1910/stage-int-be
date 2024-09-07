import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the interface for the user object
interface UserRequest extends Request {
  user?: { id: string };
}

const SECRET_KEY = process.env.JWT_SECRET ?? '';
console.log('JWT_SECRET',SECRET_KEY)
const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log('JWT_SECRET',SECRET_KEY, token)

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return jwt.verify(token, SECRET_KEY, (err, decoded) => {
    console.log(err,decoded)
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const user = decoded as JwtPayload;

    // Check if user has an id property
    if (user && typeof user.id === 'string') {
      req.user = { id: user.id };
      return next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  });
};

export default authMiddleware;