import apartmentModel from './apartment.model.js';

export const createApartment = async (input) => {
  const apartment = await apartmentModel.create(input);
  return apartment;
};

export const findApartmentById = async (_id) => {
  const apartment = await apartmentModel.findById(_id).lean();
  return apartment;
};

export const findAllApartments = async () => {
  const apartments = await apartmentModel.find().lean();
  return apartments;
};

export const deleteApartmentById = async (_id) => {
  const deletedApartment = await apartmentModel.deleteOne({ _id });
  return deletedApartment;
};
