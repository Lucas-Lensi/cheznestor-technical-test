/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai from 'chai';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signJwt, verifyJwt, comparePasswords } from './auth.service.js';

chai.should();

describe('Auth service', () => {
  const testUser = { _id: 'testUserId' };
  const jwtApiKey = 'secretJwtApiKey';
  const testPassword = 'testPassword';
  let hashedPassword;

  before(async () => {
    hashedPassword = await bcrypt.hash(testPassword, 10);
  });

  describe('signJwt()', () => {
    it('should sign a JWT token with the provided user ID', async () => {
      const token = await signJwt(testUser, jwtApiKey);
      const decoded = await jwt.verify(token, jwtApiKey);
      decoded.should.have.property('userId').that.equals(testUser._id);
    });
  });

  describe('verifyJwt()', () => {
    it('should return the decoded token when given a valid token', async () => {
      const token = await signJwt(testUser, jwtApiKey);
      const decoded = await verifyJwt(token, jwtApiKey);
      decoded.should.have.property('userId').that.equals(testUser._id);
    });
  });

  describe('comparePasswords()', () => {
    it('should return true when given the correct password', async () => {
      const result = await comparePasswords(testPassword, hashedPassword);
      result.should.be.true;
    });

    it('should return false when given an incorrect password', async () => {
      const incorrectPassword = 'incorrectPassword';
      const result = await comparePasswords(incorrectPassword, hashedPassword);
      result.should.be.false;
    });
  });
});
