/* eslint-disable no-promise-executor-return */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import pkg from 'lodash';
import server from '../../index.js';
import Apartment from './apartment.model.js';
import User from '../user/user.model.js';
import { signJwt } from '../auth/auth.service.js'
import { findUserByEmail } from '../user/user.service.js';

const { omit } = pkg;

chai.should();
chai.use(chaiHttp);

const apartment = {
  title: 'Super apartment place bellecour',
  area: 120,
  floor: 4,
  address: {
    street: '1 Rue VIctor Hugo',
    zipCode: '69002',
    city: 'Lyon',
    country: 'France'
  }
};

let apartmentId;

describe('Apartment', () => {
  let userToken;
  let commercialToken;

  before((done) => {
    const promises = [
      findUserByEmail('jane.doe@gmail.com'),
      findUserByEmail('john.doe@gmail.com'),
      Apartment.deleteMany({}),
    ]
    Promise.all(promises).then(data => {
      const [user, commercial] = data;
      [userToken, commercialToken] = [signJwt(user), signJwt(commercial)];
      done();
    })
  });

  describe('Test POST /apartment/ route', () => {
    it('It should return an error if no token specified', (done) => {
      chai
        .request(server)
        .post('/apartment')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('fail');
          res.body.should.have.property('message').eql('You are not logged in');
          done();
        });
    });
    it('It should return an error if user is not commercial', (done) => {
      chai
        .request(server)
        .post('/apartment')
        .set({ "Authorization": `Bearer ${userToken}` })
        .send(apartment)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('fail');
          res.body.should.have.property('message').eql('Not authorized');
          done();
        });
    });
    it('It should return an error if missing fields', (done) => {
        chai
          .request(server)
          .post('/apartment')
          .set({ "Authorization": `Bearer ${commercialToken}` })
          .send(omit(apartment, 'area'))
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.have.property('status').eql('fail');
            res.body.should.have.property('message');
            res.body.message.should.have.deep.members([{'area': 'Area is required'}]);
            done();
          });
      });
    it('It should create a apartment if everything ok', (done) => {
      chai
        .request(server)
        .post('/apartment')
        .set({ "Authorization": `Bearer ${commercialToken}` })
        .send(omit(apartment, 'floor'))
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.have.property('apartment');
          res.body.data.apartment.should.have.property('_id');
          res.body.data.apartment.should.have.property('createdAt');
          res.body.data.apartment.should.have.property('updatedAt');
          res.body.data.apartment.should.have.property('title');
          res.body.data.apartment.should.have.property('area');
          res.body.data.apartment.should.have.property('address');
          res.body.data.apartment.address.should.be.a('object');
          res.body.data.apartment.address.should.have.property('street');
          res.body.data.apartment.address.should.have.property('zipCode');
          res.body.data.apartment.address.should.have.property('city');
          res.body.data.apartment.address.should.have.property('country');
          apartmentId = res.body.data.apartment._id;
        });
        chai
        .request(server)
        .post('/apartment')
        .set({ "Authorization": `Bearer ${commercialToken}` })
        .send(apartment)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.have.property('apartment');
          res.body.data.apartment.should.have.property('_id');
          res.body.data.apartment.should.have.property('createdAt');
          res.body.data.apartment.should.have.property('updatedAt');
          res.body.data.apartment.should.have.property('title');
          res.body.data.apartment.should.have.property('area');
          res.body.data.apartment.should.have.property('address');
          res.body.data.apartment.address.should.be.a('object');
          res.body.data.apartment.address.should.have.property('street');
          res.body.data.apartment.address.should.have.property('zipCode');
          res.body.data.apartment.address.should.have.property('city');
          res.body.data.apartment.address.should.have.property('country');
        done();
        });
    });
  });

  describe('Test GET /apartment/ route', () => {
    it('It should return a list of all apartments', (done) => {
      chai
        .request(server)
        .get('/apartment')
        .set({ "Authorization": `Bearer ${userToken}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.have.property('apartments');
          res.body.data.apartments.should.be.an('array');
          res.body.data.apartments.should.have.length(2);
          done();
        });
    });
  });

  describe('Test GET /apartment/:id route', () => {
    it('It should return an apartment', (done) => {
      chai
        .request(server)
        .get(`/apartment/${apartmentId}`)
        .set({ "Authorization": `Bearer ${userToken}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.have.property('apartment');
          res.body.data.apartment.should.have.property('_id');
          res.body.data.apartment.should.have.property('createdAt');
          res.body.data.apartment.should.have.property('updatedAt');
          res.body.data.apartment.should.have.property('title');
          res.body.data.apartment.should.have.property('area');
          res.body.data.apartment.should.have.property('address');
          res.body.data.apartment.address.should.be.a('object');
          res.body.data.apartment.address.should.have.property('street');
          res.body.data.apartment.address.should.have.property('zipCode');
          res.body.data.apartment.address.should.have.property('city');
          res.body.data.apartment.address.should.have.property('country');
          done();
        });
    });
  });

  describe('Test PUT /apartment/:id route', () => {
    it('It should return an error if no token specified', (done) => {
      chai
        .request(server)
        .put(`/apartment/${apartmentId}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('fail');
          res.body.should.have.property('message').eql('You are not logged in');
          done();
        });
    });
    it('It should return an error if user is not commercial', (done) => {
      chai
        .request(server)
        .put(`/apartment/${apartmentId}`)
        .set({ "Authorization": `Bearer ${userToken}` })
        .send(apartment)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('fail');
          res.body.should.have.property('message').eql('Not authorized');
          done();
        });
    });
    it('It should update and return the updated apartment', (done) => {
      chai
        .request(server)
        .put(`/apartment/${apartmentId}`)
        .set({ "Authorization": `Bearer ${commercialToken}` })
        .send({ ...apartment, title: 'Appartement Lumineux' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.have.property('apartment');
          res.body.data.apartment.should.have.property('_id');
          res.body.data.apartment.should.have.property('createdAt');
          res.body.data.apartment.should.have.property('updatedAt');
          res.body.data.apartment.should.have.property('title').eql('Appartement Lumineux');
          res.body.data.apartment.should.have.property('area');
          res.body.data.apartment.should.have.property('address');
          res.body.data.apartment.address.should.be.a('object');
          res.body.data.apartment.address.should.have.property('street');
          res.body.data.apartment.address.should.have.property('zipCode');
          res.body.data.apartment.address.should.have.property('city');
          res.body.data.apartment.address.should.have.property('country');
          done();
        });
    });
  });

  after((done) => {
    server.close();
    done();
  })

});
