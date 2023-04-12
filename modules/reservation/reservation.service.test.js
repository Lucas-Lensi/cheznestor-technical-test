/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai from 'chai';
import { calculateRental } from './reservation.service.js';

chai.should();

describe('Reservation service', () => {
  describe('calculateRental', () => {
    it('should double the room price and return it', () => {
      const room = { price: 300 };
      const rental = calculateRental(room);
      rental.should.eql(600);
    });
  });
});
