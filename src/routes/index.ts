import express from 'express';
import authRoute from './auth/authRoute';
import assetsRoute from './assets/assetRoute';
import path from 'path';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/asset',
    route: assetsRoute,
  }
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
 
export default router;
