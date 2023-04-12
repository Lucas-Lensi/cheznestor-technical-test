/* eslint-disable no-promise-executor-return */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */

import chai from 'chai';
import chaiHttp from 'chai-http';
import pkg from 'lodash';
import server from '../../index.js';
import Reservation from './reservation.model.js';
import { signJwt } from '../auth/auth.service.js'
import { findUserByEmail } from '../user/user.repository.js';
import Room from '../room/room.model.js';
import { createRoom } from '../room/room.repository.js';
import Apartment from '../apartment/apartment.model.js';

const { omit } = pkg;

chai.should();
chai.use(chaiHttp);

describe('Reservation', () => {
  let token;
  let user;
  let secondUser;
  let apartment;
  let rooms;

  const room = {
    title: 'Super chambre 2',
    area: 15,
    price: 400,
    appartmentId: '',
  };

  const reservation = {
    userId: '',
    roomId: '',
  }

  before((done) => {
    const promises = [
      Reservation.deleteMany({}),
      findUserByEmail('jane.doe@gmail.com'),
      findUserByEmail('john.doe@gmail.com'),
      Apartment.findOne({}, {}, { sort: { 'created_at' : -1 } }),
      Room.findOne({}, {}, { sort: { 'created_at' : -1 } }),
    ]
    Promise.all(promises).then(data => {
      [,user, secondUser, apartment, ...rooms] = data;
      token = signJwt(user);
      room.apartmentId = apartment._id;
      createRoom(room).then(el => {
        rooms.push(el);
        done();
      })
    })
  });

  describe('Test POST /reservation route', () => {
    it('It should return an error if no token specified', (done) => {
      chai
        .request(server)
        .post('/reservation')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('fail');
          res.body.should.have.property('message').eql('You are not logged in');
          done();
        });
    });
    it('It should return an error if missing fields', (done) => {
      reservation.roomId = rooms[0].id;
      chai
        .request(server)
        .post('/reservation')
        .set({ "Authorization": `Bearer ${token}` })
        .send(reservation)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property('status').eql('fail');
          res.body.should.have.property('message');
          res.body.message.should.have.deep.members([{'userId': 'UserId is required'}]);
          done();
        });
    });
    it('It should return an error if user or room not exist', (done) => {
      chai
        .request(server)
        .post('/reservation')
        .set({ "Authorization": `Bearer ${token}` })
        .send({ ...reservation, userId: '123456789123456789123456' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql('fail');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('User or room not found');
          done();
        });
    });
    it('It should create a reservation', (done) => {
      reservation.userId = user._id
      chai
        .request(server)
        .post('/reservation')
        .set({ "Authorization": `Bearer ${token}` })
        .send(reservation)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.have.property('reservation');
          res.body.data.reservation.should.have.property('_id');
          res.body.data.reservation.should.have.property('userId');
          res.body.data.reservation.should.have.property('roomId');
          res.body.data.reservation.should.have.property('status');
          res.body.data.reservation.should.have.property('rental').eql(1000);
          done();
        });
    });
    it('It should return an error if user or room already booked', (done) => {
      chai
        .request(server)
        .post('/reservation')
        .set({ "Authorization": `Bearer ${token}` })
        .send({ ...reservation, roomId: rooms[1].id })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('status').eql('fail');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('User already booked');
        });
      chai
        .request(server)
        .post('/reservation')
        .set({ "Authorization": `Bearer ${token}` })
        .send({ userId: secondUser._id, roomId: rooms[0].id })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('status').eql('fail');
          res.body.should.have.property('message');
          res.body.should.have.property('message').eql('Room already booked');
        });
        done();
    });
  });

  after((done) => {
    server.close();
    done();
  });
});