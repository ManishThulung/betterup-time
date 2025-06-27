import bcrypt from "bcrypt";

export const hashData = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const compareData = async (
  oldPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(oldPassword, hashedPassword);
};
