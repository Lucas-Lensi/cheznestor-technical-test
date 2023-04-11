import mongoose from 'mongoose';

const { Schema } = mongoose;

const ApartmentSchema = new Schema(
  {
    title: {
      type: String,
      required: 'Title must be specified',
    },
    area: {
      type: Number,
      required: 'Area must be specified',
    },
    floor: Number,
    address: {
      street: {
        type: String,
        required: 'Street must be specified',
      },
      zipCode: {
        type: String,
        required: 'ZipCode must be specified',
      },
      city: {
        type: String,
        required: 'City must be specified',
      },
      country: {
        type: String,
        required: 'Country must be specified',
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Apartment', ApartmentSchema);
