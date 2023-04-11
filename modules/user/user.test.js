/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import pkg from 'lodash';
import server from '../../index.js';
import User from './user.model.js';
import { signJwt } from '../auth/auth.service.js'

const { omit } = pkg;

chai.should();
chai.use(chaiHttp);

describe('User', () => {
  let token;

  before((done) => {
    User.findOne({}, {}, { sort: { 'created_at' : -1 } }, async (err, user) => {
      token = await signJwt(user);
      done();
    });
  });

  describe('Test GET /user/me route', () => {
    it('It should return an error if no token specified', (done) => {
      chai
        .request(server)
        .get('/user/me')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('fail');
          res.body.should.have.property('message').eql('You are not logged in');
          done();
        });
    });
    it('It should get the logged user informations', (done) => {
      chai
        .request(server)
        .get('/user/me')
        .set({ "Authorization": `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.have.property('user');
          res.body.data.user.should.have.property('firstname');
          res.body.data.user.should.have.property('lastname');
          res.body.data.user.should.have.property('email');
          res.body.data.user.should.have.property('_id');
          res.body.data.user.should.have.property('createdAt');
          res.body.data.user.should.have.property('updatedAt');
          res.body.data.user.should.not.have.property('password');
        done();
        });
    });
  });

  after((done) => {
    server.close();
    done();
  })

});
