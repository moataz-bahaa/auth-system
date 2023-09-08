import { StatusCodes } from 'http-status-codes';
import User from '../../models/user.model.js';
import { comparePassword, hashPassword } from '../../utils/bcrypt.js';
import { BadRequestError, NotFoundError } from '../../utils/errors.js';
import {
  deleteToken,
  generateAccessAndRefreshTokens,
  generateAccessToken,
  verifyToken,
} from '../../utils/jwt-utils.js';
import {
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
  signupSchema,
} from './auth.validator.js';

export const postSignup = async (req, res, next) => {
  const { error, value } = signupSchema.validate(req.body);

  if (error) {
    throw new BadRequestError(error.details);
  }

  const isEmailExists = await User.findOne({ email: value.email });

  if (isEmailExists) {
    throw new BadRequestError('email alreader exists');
  }

  const hashedPassword = await hashPassword(value.password);

  const user = await User.create({
    name: value.name,
    email: value.email,
    hashedPassword,
  });

  res.status(StatusCodes.CREATED).json({
    message: 'account created successfully',
  });
};

export const postLogin = async (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);

  if (error) {
    throw new BadRequestError(error.details);
  }

  const user = await User.findOne({ email: value.email });

  if (!user) {
    throw new NotFoundError('incorrect email or password');
  }

  const isPasswordMatch = comparePassword(value.password, user.hashedPassword);

  if (!isPasswordMatch) {
    throw new NotFoundError('incorrect email or password');
  }

  const tokens = await generateAccessAndRefreshTokens({ id: user._id });

  const userDoc = user._doc;
  delete userDoc.hashedPassword;

  res.status(StatusCodes.OK).json({
    message: 'logged in successfully',
    user: userDoc,
    tokens,
  });
};

export const postVerifyRefreshToken = async (req, res, next) => {
  const { error, value } = refreshTokenSchema.validate(req.body);

  if (error) {
    throw new BadRequestError(error.details);
  }

  const payload = await verifyToken(value.refreshToken);

  const accessToken = await generateAccessToken({ _id: payload._id });

  res.status(StatusCodes.OK).json({
    message: 'access token created successfully',
    accessToken,
  });
};

export const postLogout = async (req, res, next) => {
  const { error, value } = logoutSchema.validate(req.body);

  if (error) {
    throw new BadRequestError(error.details);
  }

  await deleteToken(value.refreshToken);
  await deleteToken(value.accessToken);

  res.status(StatusCodes.OK).json({
    message: 'logged out successfully',
  });
};
