import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw createHttpError(401, 'Missing access token');
  }

  const existSession = await Session.findOne({ accessToken });

  if (!existSession) {
    throw createHttpError(401, 'Session not found');
  }

  const isAccessTokenExpired =
    new Date() > new Date(existSession.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const existUser = await User.findById(existSession.userId);

  if (!existUser) {
    throw createHttpError(401);
  }

  req.user = existUser;
  next();
};
