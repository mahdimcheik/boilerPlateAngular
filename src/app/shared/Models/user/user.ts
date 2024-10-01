export type User = {};

export type UserCreateDTO = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export type UserResponseDTO = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
};

export type UserLoginDTO = {
  email: string;
  password: string;
};

export type ResponseLoginDTO = {
  message: string;
  data: {
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
  };
};
