import mongoose from 'mongoose';

const { Schema } = mongoose;

const Reservation = new Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: 'Room must be specified',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: 'User must be specified',
    },
    status: {
      type: String,
      enum: ['booked', 'done'],
      default: 'booked',
    },
    rental: Number,
  },
  { timestamps: true }
);

export default mongoose.model('Reservation', Reservation);
