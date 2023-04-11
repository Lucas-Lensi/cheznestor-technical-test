import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signJwt = (user, jwtApiKey = null) =>
  jwt.sign({ userId: user._id }, jwtApiKey || process.env.JWT_API_KEY, {
    expiresIn: '10h',
  });

export const verifyJwt = (token, jwtApiKey = null) =>
  jwt.verify(token, jwtApiKey || process.env.JWT_API_KEY);

export const comparePasswords = (candidatePassword, password) =>
  bcrypt.compare(candidatePassword, password);
