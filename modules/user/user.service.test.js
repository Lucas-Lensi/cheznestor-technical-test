/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai from 'chai';
import { deletePasswordFromUser } from './user.service.js';

chai.should();

describe('User service', () => {
  describe('deletePasswordFromUser', () => {
    it('should delete the password from user object and return it', () => {
      const user = {
        firtname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: 'password',
      };
      const userWithoutPwd = deletePasswordFromUser(user);
      userWithoutPwd.should.not.have.property('password');
    });
  });
});
