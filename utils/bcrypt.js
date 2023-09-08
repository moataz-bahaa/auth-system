import bcrypt from 'bcryptjs';

export const hashPassword = (password) => {
  // TODO: what is salt
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);
