import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key', // Replace with your actual secret key
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Find the user based on the JWT payload
      const user = await prisma.user.findUnique({ where: { id: payload.sub } });

      if (user) {
        // If user is found, return user object to the route
        return done(null, user);
      } else {
        // If user is not found, return false
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;