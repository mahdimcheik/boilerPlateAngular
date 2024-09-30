export type User = {};

export type UserCreateDTO = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserResponseDTO = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
};
