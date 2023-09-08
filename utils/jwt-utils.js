import jwt from 'jsonwebtoken';
import UserToken from '../models/userToken.model.js';
import { ForbidenError } from './errors.js';

const SECRET = process.env.JWT_SECRET;

const generateToken = async (user, expiresIn) => {
  const token = jwt.sign(user, SECRET, { expiresIn });

  await UserToken.create({
    userId: user._id,
    token,
  });

  return token;
};

export const generateAccessToken = (user) => generateToken(user, '20m');

export const generateAccessAndRefreshTokens = async (user) => {
  const accessToken = await generateAccessToken(user);

  const refreshToken = await generateToken(user, '1d');

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = async (token) => {
  try {
    const isExists = await UserToken.findOne({ token: token });

    if (!isExists) {
      throw new ForbidenError();
    }

    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new ForbidenError('invalid token');
  }
};

export const deleteToken = async (token) => UserToken.deleteOne({ token });
