import { Request, Response, NextFunction } from 'express';
import passport from './passport-config';

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: any) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

export default authenticateJWT;