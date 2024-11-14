export type User = {};

export type UserCreateDTO = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};
export type UserChangePasswordDTO = {
  userId: string;
  resetToken: string;
  password?: string;
  passwordConfirmation?: string;
};
export enum EnumGender {
  Homme,
  Femme,
  NonBinaire,
  Autre,
}

export type UserResponseDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imgUrl: string;
  dateOfBirth: Date;
  lastLogginAt: Date;
  gender: EnumGender;
  emailConfirmed: boolean;
  roles: string[];
};

export type UserLoginDTO = {
  email: string;
  password: string;
};

// export type ResponseLoginDTO = {
//   message: string;
//   status: number;
//   data: {
//     token: string;
//     user: UserResponseDTO;
//   };

// };

export type ResponseDTO = {
  message: string;
  status: number;
  data: any;
};
