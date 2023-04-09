import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signJwt = (user) => {
  const jwtApiKey = process.env.JWT_API_KEY;
  return jwt.sign({ user: user._id }, jwtApiKey, {
    expiresIn: '10h',
  });
};

export const verifyJwt = (token) => {
  try {
    const jwtApiKey = process.env.JWT_API_KEY;
    return jwt.verify(token, jwtApiKey);
  } catch (error) {
    return null;
  }
};

export const comparePasswords = (candidatePassword, password) =>
  bcrypt.compare(candidatePassword, password);
