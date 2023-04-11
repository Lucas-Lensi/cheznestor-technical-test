/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import chai from 'chai';
import mongoose from 'mongoose';

import {
  createApartment,
  findApartmentById,
  findAllApartments,
  updateApartmentById,
  deleteApartmentById,
} from './apartment.service.js';
import Apartment from './apartment.model.js';

chai.should();

describe('Apartment Service', () => {
  let createdApartment;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
    await Apartment.deleteMany({});
  });

  after(async () => {
    await mongoose.close;
  });

  describe('createApartment', () => {
    it('should create a new apartment', async () => {
      const input = {
        title: 'Apartment A',
        floor: 2,
        area: 150,
        address: {
          street: '1 rue dupont',
          zipCode: '69000',
          city: 'Lyon',
          country: 'France',
        },
      };

      const apartment = await createApartment(input);

      apartment.should.have.property('createdAt');
      apartment.should.have.property('updatedAt');
      apartment.should.have.property('title').eql('Apartment A');
      apartment.should.have.property('floor').eql(2);
      apartment.should.have.property('area').eql(150);
      apartment.should.have.property('address');
      apartment.address.should.have.property('street').eql('1 rue dupont');
      apartment.address.should.have.property('zipCode').eql('69000');
      apartment.address.should.have.property('city').eql('Lyon');
      apartment.address.should.have.property('country').eql('France');
      apartment.should.have.property('_id');

      createdApartment = apartment.toObject();
    });
  });

  describe('findApartmentById', () => {
    it('should return an apartment by ID', async () => {
      const apartment = await findApartmentById(createdApartment._id);

      apartment.should.have.property('_id').eql(createdApartment._id);
      apartment.should.have.property('createdAt');
      apartment.should.have.property('updatedAt');
      apartment.should.have.property('title').eql('Apartment A');
      apartment.should.have.property('floor').eql(2);
      apartment.should.have.property('area').eql(150);
      apartment.should.have.property('address');
      apartment.address.should.have.property('street').eql('1 rue dupont');
      apartment.address.should.have.property('zipCode').eql('69000');
      apartment.address.should.have.property('city').eql('Lyon');
      apartment.address.should.have.property('country').eql('France');
    });
  });

  describe('findAllApartments', () => {
    it('should return all apartments', async () => {
      await Apartment.create({
        title: 'Apartment B',
        floor: 3,
        area: 200,
        address: {
          street: '1 rue paul',
          zipCode: '69004',
          city: 'Lyon',
          country: 'France',
        },
      });

      const apartments = await findAllApartments();

      apartments.should.have.lengthOf(2);

      apartments[0].should.have.property('title').equal('Apartment A');
      apartments[1].should.have.property('title').equal('Apartment B');
    });
  });

  describe('updateApartmentById', () => {
    it('should update an apartment by ID', async () => {
      const updatedInput = {
        ...createdApartment,
        floor: 6,
        title: 'Apartment AB'
      };
      const apartment = await updateApartmentById(
        createdApartment._id,
        updatedInput
      );

      apartment.should.have.property('_id').eql(createdApartment._id);
      apartment.should.have.property('createdAt');
      apartment.should.have.property('updatedAt');
      apartment.should.have.property('title').eql('Apartment AB');
      apartment.should.have.property('floor').eql(6);
      apartment.should.have.property('area').eql(150);
      apartment.should.have.property('address');
      apartment.address.should.have.property('street').eql('1 rue dupont');
      apartment.address.should.have.property('zipCode').eql('69000');
      apartment.address.should.have.property('city').eql('Lyon');
      apartment.address.should.have.property('country').eql('France');
    });
  });

  describe('deleteApartmentById', () => {
    it('should delete an apartment by ID', async () => {
      const deletedApartment = await deleteApartmentById(createdApartment._id);

      const apartments = await findAllApartments();
      apartments.should.have.lengthOf(1);

      deletedApartment.should.have.property('deletedCount').equal(1);
    });
  });
});
