export const toPublicUser = (doc) => {
  return {
    id: doc._id,
    firstname: doc.firstname,
    lastname: doc.lastname,
    email: doc.email,
    phoneNumber: doc.phoneNumber,
    role:doc.role, //tur
  };
};
export const toPublicPatient = (doc) => {
  return {
    id: doc._id,
    firstname: doc.firstname,
    lastname: doc.lastname,
    email: doc.email,
    phoneNumber: doc.phoneNumber,
    role:doc.role, //tur
  };
};
export const toPublicMedStaff = (doc) => {
  return {
    id: doc._id,
    firstname: doc.firstname,
    lastname: doc.lastname,
    email: doc.email,
    phoneNumber: doc.phoneNumber,
    role:doc.role, //tur
    position: doc.position,
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
