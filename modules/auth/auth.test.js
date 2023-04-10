/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import pkg from 'lodash';
import server from '../../index.js';
import userModel from '../user/user.model.js';

const { omit } = pkg;

chai.should();
chai.use(chaiHttp);

const user = {
  firstname: 'Jane',
  lastname: 'Doe',
  email: 'jane.doe@gmail.com',
  password: 'password',
  password_confirmation: 'password',
};

const commercial = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@gmail.com',
  password: 'password',
  password_confirmation: 'password',
  isCommercial: true
};

describe('Auth', () => {

  before((done) => {
    userModel.deleteMany({}, (err) => {
       done();
    });
  });

  describe('Test POST /auth/register route', () => {
    it('It should return an error if missing fields', (done) => {
      chai
        .request(server)
        .post('/auth/register')
        .send(omit(user, 'email'))
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property('status').eql('fail');
          res.body.should.have.property('message');
          res.body.message.should.have.deep.members([{'email': 'Email is required'}]);
          done();
        });
    });
    it('It should create a user if everything ok', (done) => {
      chai
        .request(server)
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.have.property('user');
          res.body.data.user.should.have.property('firstname');
          res.body.data.user.should.have.property('lastname');
          res.body.data.user.should.have.property('email');
          res.body.data.user.should.have.property('isCommercial').eql(false);
          res.body.data.user.should.have.property('_id');
          res.body.data.user.should.have.property('createdAt');
          res.body.data.user.should.have.property('updatedAt');
          res.body.data.user.should.not.have.property('password');
        done();
        });
    });
    it('It should create a commercial if everything ok', (done) => {
      chai
        .request(server)
        .post('/auth/register')
        .send(commercial)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.have.property('user');
          res.body.data.user.should.have.property('firstname');
          res.body.data.user.should.have.property('lastname');
          res.body.data.user.should.have.property('email');
          res.body.data.user.should.have.property('isCommercial').eql(true);
          res.body.data.user.should.have.property('_id');
          res.body.data.user.should.have.property('createdAt');
          res.body.data.user.should.have.property('updatedAt');
          res.body.data.user.should.not.have.property('password');
        done();
        });
    });
  });

  describe('Test POST /auth/login route', () => {
    it('It should return an error if email or password are incorrect', (done) => {
      chai
      .request(server)
      .post('/auth/login')
      .send({ email: user.email, password: 'passwo' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('message').eql('Invalid email or password');
      });
      chai
      .request(server)
      .post('/auth/login')
      .send({ email: 'jon.doe@gmail.com', password: user.password })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('message').eql('Invalid email or password');
      done();
      });
    });
    it('It should return an auth token', (done) => {
      chai
      .request(server)
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('accessToken').to.be.a("string");
        done();
      });
    })
  });

  after((done) => {
    server.close();
    done();
  })

});
