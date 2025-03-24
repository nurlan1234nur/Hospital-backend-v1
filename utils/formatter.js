export const toPublicUser = (doc) => {
  return {
    id: doc._id,
    firstname: doc.firstname,
    lastname: doc.lastname,
    email: doc.email,
    phoneNumber: doc.phoneNumber,
  };
};

export const modifiedPatient = (doc) => {
  return {
    id: doc._id,
    firstname: doc.firstname,
    lastname: doc.lastname,
    email: doc.email,
    phoneNumber: doc.phoneNumber,
  };
};
