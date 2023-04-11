import mongoose from 'mongoose';

const { Schema } = mongoose;

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: 'Title must be specified',
    },
    area: {
      type: Number,
      required: 'Area must be specified',
    },
    price: {
      type: Number,
      required: 'Price must be specified',
    },
    apartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Apartment',
      required: 'Apartment must be specified',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Room', RoomSchema);
