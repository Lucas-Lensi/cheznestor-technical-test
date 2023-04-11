import Apartment from './apartment.model.js';

export const createApartment = async (input) => {
  const apartment = await Apartment.create(input);
  return apartment;
};

export const findApartmentById = async (_id) => {
  const apartment = await Apartment.findById(_id).exec();
  return apartment;
};

export const findAllApartments = async () => {
  const apartments = await Apartment.find().exec();
  return apartments;
};

export const updateApartmentById = async (_id, input) => {
  const updatedApartment = await Apartment.findByIdAndUpdate(_id, input, {
    new: true,
  }).lean();
  return updatedApartment;
};

export const deleteApartmentById = async (_id) => {
  const deletedApartment = await Apartment.deleteOne({ _id });
  return deletedApartment;
};
