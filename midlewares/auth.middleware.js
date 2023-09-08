import User from '../models/user.model.js';
import { UnAuthenticatedError } from '../utils/errors.js';
import { verifyToken } from '../utils/jwt-utils.js';

export const isAuth = async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader) {
    throw new UnAuthenticatedError();
  }

  try {
    const token = authHeader.split(' ')[1];
    const payload = await verifyToken(token);

    if (!payload) {
      throw new UnAuthenticatedError();
    }

    const user = await User.findById(payload._id);

    if (!user) {
      throw new UnAuthenticatedError('invalid token');
    }

    req.user = user;
  } catch (err) {
    throw new UnAuthenticatedError();
  }
  return next();
};
