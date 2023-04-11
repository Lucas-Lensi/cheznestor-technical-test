/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import chai from 'chai';
import mongoose from 'mongoose';

import {
  createRoom,
  findRoomById,
  findAllRooms,
  updateRoomById,
  deleteRoomById,
} from './room.service.js';
import Room from './room.model.js';
import Apartment from '../apartment/apartment.model.js';

chai.should();

describe('Room Service', () => {
  let createdRoom;
  let apartment = {
    title: 'Apartment for Room',
    floor: 2,
    area: 150,
    address: {
      street: '1 rue dupont',
      zipCode: '69000',
      city: 'Lyon',
      country: 'France',
    },
  };

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    await Room.deleteMany({});
    apartment = (await (Apartment.create(apartment))).toObject();
  });

  after(async () => {
    await mongoose.close;
  });

  describe('createRoom', () => {
    it('should create a new room', async () => {
      const input = {
        title: 'Room A',
        price: 200,
        area: 15,
        apartmentId: apartment._id,
      };

      const room = await createRoom(input);

      room.should.have.property('createdAt');
      room.should.have.property('updatedAt');
      room.should.have.property('title').eql('Room A');
      room.should.have.property('price').eql(200);
      room.should.have.property('area').eql(15);
      room.should.have.property('apartmentId').eql(apartment._id);
      room.should.have.property('_id');

      createdRoom = room.toObject();
    });
  });

  describe('findRoomById', () => {
    it('should return a room by ID', async () => {
      const room = await findRoomById(createdRoom._id);

      room.should.have.property('_id').eql(createdRoom._id);
      room.should.have.property('createdAt');
      room.should.have.property('updatedAt');
      room.should.have.property('title').eql('Room A');
      room.should.have.property('price').eql(200);
      room.should.have.property('area').eql(15);
      room.should.have.property('apartmentId').eql(apartment._id);
    });
  });

  describe('findAllRooms', () => {
    it('should return all rooms', async () => {
      await Room.create({
        title: 'Room B',
        price: 300,
        area: 20,
        apartmentId: apartment._id,
      });

      const rooms = await findAllRooms();

      rooms.should.have.lengthOf(2);

      rooms[0].should.have.property('title').equal('Room A');
      rooms[1].should.have.property('title').equal('Room B');
    });
  });

  describe('updateRoomById', () => {
    it('should update a room by ID', async () => {
      const updatedInput = {
        ...createdRoom,
        price: 250,
        title: 'Room AB'
      };
      const room = await updateRoomById(
        createdRoom._id,
        updatedInput
      );

      room.should.have.property('_id').eql(createdRoom._id);
      room.should.have.property('createdAt');
      room.should.have.property('updatedAt');
      room.should.have.property('title').eql('Room AB');
      room.should.have.property('price').eql(250);
      room.should.have.property('area').eql(15);
      room.should.have.property('apartmentId').eql(apartment._id);
    });
  });

  describe('deleteRoomById', () => {
    it('should delete a room by ID', async () => {
      const deletedRoom = await deleteRoomById(createdRoom._id);

      const rooms = await findAllRooms();
      rooms.should.have.lengthOf(1);

      deletedRoom.should.have.property('deletedCount').equal(1);
    });
  });
});
