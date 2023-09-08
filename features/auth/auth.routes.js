import { Router } from 'express';
import {
  postLogin,
  postLogout,
  postSignup,
  postVerifyRefreshToken,
} from './auth.controller.js';

const router = Router();

router.post('/signup', postSignup);

router.post('/login', postLogin);

router.post('/logout', postLogout);

router.post('/tokens/refresh', postVerifyRefreshToken);

export default router;
