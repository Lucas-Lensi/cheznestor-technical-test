/* eslint-disable no-promise-executor-return */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import pkg from 'lodash';
import server from '../../index.js';
import roomModel from './room.model.js';
import userModel from '../user/user.model.js';
import { signJwt } from '../auth/auth.service.js'
import { findUserByEmail } from '../user/user.service.js';
import apartmentModel from '../apartment/apartment.model.js';

const { omit } = pkg;

chai.should();
chai.use(chaiHttp);

const room = {
  title: 'Super room place bellecour',
  area: 20,
  price: 500,
  appartmentId: '',
};

describe('Room', () => {
  let userToken;
  let commercialToken;

  before((done) => {
    const promises = [
      findUserByEmail('jane.doe@gmail.com'),
      findUserByEmail('john.doe@gmail.com'),
      apartmentModel.findOne({}, {}, { sort: { 'created_at' : -1 } }),
      roomModel.deleteMany({}),
    ]
    Promise.all(promises).then(data => {
      const [user, commercial, apartment] = data;
      room.apartmentId = apartment._id;
      [userToken, commercialToken] = [signJwt(user), signJwt(commercial)];
      done();
    })
  });

  describe('Test POST /room route', () => {
    it('It should return an error if no token specified', (done) => {
      chai
        .request(server)
        .post('/room')
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
        .post('/room')
        .set({ "Authorization": `Bearer ${userToken}` })
        .send(room)
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
          .post('/room')
          .set({ "Authorization": `Bearer ${commercialToken}` })
          .send(omit(room, 'area'))
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.have.property('status').eql('fail');
            res.body.should.have.property('message');
            res.body.message.should.have.deep.members([{'area': 'Area is required'}]);
            done();
          });
    });
    it('It should return an error if apartment not exist', (done) => {
      chai
        .request(server)
        .post('/room')
        .set({ "Authorization": `Bearer ${commercialToken}` })
        .send({ ...room, apartmentId: '6433fd305d3e74d9567b0b32' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql('fail');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Apartment not found');
          done();
        });
    });
    it('It should create a room if everything ok', (done) => {
      chai
        .request(server)
        .post('/room')
        .set({ "Authorization": `Bearer ${commercialToken}` })
        .send(room)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.have.property('room');
          res.body.data.room.should.have.property('_id');
          res.body.data.room.should.have.property('createdAt');
          res.body.data.room.should.have.property('updatedAt');
          res.body.data.room.should.have.property('title');
          res.body.data.room.should.have.property('area');
          res.body.data.room.should.have.property('price');
          res.body.data.room.should.have.property('apartmentId');
        done();
        });
    });
  });

  after((done) => {
    server.close();
    done();
  })

});
