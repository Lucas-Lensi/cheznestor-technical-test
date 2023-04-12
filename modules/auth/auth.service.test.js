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

  before(() => {
    hashedPassword = bcrypt.hashSync(testPassword, 10);
  });

  describe('signJwt', () => {
    it('should sign a JWT token with the provided user ID', () => {
      const token = signJwt(testUser, jwtApiKey);
      const decoded = jwt.verify(token, jwtApiKey);
      decoded.should.have.property('userId').eql(testUser._id);
    });
  });

  describe('verifyJwt', () => {
    it('should return the decoded token when given a valid token', () => {
      const token = signJwt(testUser, jwtApiKey);
      const decoded = verifyJwt(token, jwtApiKey);
      decoded.should.have.property('userId').eql(testUser._id);
    });
  });

  describe('comparePasswords', () => {
    it('should return true when given the correct password', () => {
      const result = comparePasswords(testPassword, hashedPassword);
      result.should.be.true;
    });

    it('should return false when given an incorrect password', async () => {
      const result = comparePasswords('incorrectPassword', hashedPassword);
      result.should.be.false;
    });
  });
});
