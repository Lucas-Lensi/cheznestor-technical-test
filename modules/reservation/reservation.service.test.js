/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import chai from 'chai';
import mongoose from 'mongoose';

import {
  createReservation,
  findReservationById,
  findCurrentReservationFromRoom,
  findCurrentReservationFromUser,
  endReservation
} from './reservation.service.js';
import Reservation from './reservation.model.js';
import Room from '../room/room.model.js';
import User from '../user/user.model.js';
import Apartment from '../apartment/apartment.model.js';

chai.should();

describe('Reservation Service', () => {
  let createdReservation;
  let apartment = {
    title: 'Apartment for Resa',
    floor: 2,
    area: 150,
    address: {
      street: '1 rue dupont',
      zipCode: '69000',
      city: 'Lyon',
      country: 'France',
    },
  };
  let room = {
    title: 'Room for resa',
    price: 200,
    area: 15,
    apartmentId: '',
  };
  let user = {
    firstname: 'Jean',
    lastname: 'Lefebvre',
    email: 'j.lefebvre@gmail.com',
    password: 'password'
  };

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    await Reservation.deleteMany({});
    apartment = (await (Apartment.create(apartment))).toObject();
    room = (await (Room.create({...room, apartmentId: apartment._id}))).toObject();
    user = (await (User.create(user))).toObject();
  });

  after(async () => {
    await mongoose.close;
  });

  describe('createReservation', () => {
    it('should create a new reservation', async () => {
      const input = {
        userId: user._id,
        roomId: room._id,
      };

      const reservation = await createReservation(input);

      reservation.should.have.property('createdAt');
      reservation.should.have.property('updatedAt');
      reservation.should.have.property('userId').eql(user._id);
      reservation.should.have.property('roomId').eql(room._id);
      reservation.should.have.property('status').eql('booked');
      reservation.should.have.property('_id');

      createdReservation = reservation;
    });
  });

  describe('findReservationById', () => {
    it('should return a reservation by ID', async () => {
      const reservation = await findReservationById(createdReservation._id);

      reservation.should.have.property('_id').eql(createdReservation._id);
      reservation.should.have.property('createdAt');
      reservation.should.have.property('updatedAt');
      reservation.should.have.property('userId').eql(user._id);
      reservation.should.have.property('roomId').eql(room._id);
      reservation.should.have.property('status').eql('booked');
    });
  });

  describe('findCurrentReservationFromRoom', () => {
    it('should return a reservation by room', async () => {
      const reservation = await findCurrentReservationFromRoom(createdReservation.roomId);

      reservation.should.have.lengthOf(1);
      reservation[0].should.have.property('_id').eql(createdReservation._id);
      reservation[0].should.have.property('createdAt');
      reservation[0].should.have.property('updatedAt');
      reservation[0].should.have.property('userId').eql(user._id);
      reservation[0].should.have.property('roomId').eql(room._id);
      reservation[0].should.have.property('status').eql('booked');
    });
  });

  describe('findCurrentReservationFromUser', () => {
    it('should return a reservation by user', async () => {
      const reservation = await findCurrentReservationFromUser(createdReservation.userId);

      reservation.should.have.lengthOf(1);
      reservation[0].should.have.property('_id').eql(createdReservation._id);
      reservation[0].should.have.property('createdAt');
      reservation[0].should.have.property('updatedAt');
      reservation[0].should.have.property('userId').eql(user._id);
      reservation[0].should.have.property('roomId').eql(room._id);
      reservation[0].should.have.property('status').eql('booked');
    });
  });

  describe('endReservation', () => {
    it('should update status to done', async () => {
      const reservation = await endReservation(createdReservation._id);

      reservation.should.have.property('_id').eql(createdReservation._id);
      reservation.should.have.property('createdAt');
      reservation.should.have.property('updatedAt');
      reservation.should.have.property('userId').eql(user._id);
      reservation.should.have.property('roomId').eql(room._id);
      reservation.should.have.property('status').eql('done');
    });
  });
});
