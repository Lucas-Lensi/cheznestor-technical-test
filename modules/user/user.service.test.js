/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import chai from 'chai';
import mongoose from 'mongoose';

import {
  createUser,
  findUserById,
  deleteUserById,
  findUserByEmail,
} from './user.service.js';
import User from './user.model.js';

chai.should();

describe('User Service', () => {
  let createdUser;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    await User.deleteMany({});
  });

  after(async () => {
    await mongoose.close;
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const input = {
        firstname: 'Paul',
        lastname: 'Dupont',
        email: 'p.depont@gmail.com',
        password: 'password'
      };

      const user = await createUser(input);

      user.should.have.property('createdAt');
      user.should.have.property('updatedAt');
      user.should.have.property('firstname').eql('Paul');
      user.should.have.property('lastname').eql('Dupont');
      user.should.have.property('email').eql('p.depont@gmail.com');
      user.should.not.have.property('password');
      user.should.have.property('_id');

      createdUser = user;
    });
  });

  describe('findUserById', () => {
    it('should return a user by ID', async () => {
      const user = (await findUserById(createdUser._id)).toObject();

      user.should.have.property('_id').eql(createdUser._id);
      user.should.have.property('createdAt');
      user.should.have.property('updatedAt');
      user.should.have.property('firstname').eql('Paul');
      user.should.have.property('lastname').eql('Dupont');
      user.should.have.property('email').eql('p.depont@gmail.com');
      user.should.not.have.property('password');
    });
  });

  describe('findUserByEMail', () => {
    it('should return a user by email', async () => {
      const user = (await findUserByEmail(createdUser.email)).toObject();

      user.should.have.property('_id').eql(createdUser._id);
      user.should.have.property('createdAt');
      user.should.have.property('updatedAt');
      user.should.have.property('firstname').eql('Paul');
      user.should.have.property('lastname').eql('Dupont');
      user.should.have.property('email').eql('p.depont@gmail.com');
      user.should.have.property('password');
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user by ID', async () => {
      const deletedUser = await deleteUserById(createdUser._id);

      deletedUser.should.have.property('deletedCount').equal(1);
    });
  });
});
