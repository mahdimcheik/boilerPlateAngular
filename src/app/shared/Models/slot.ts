export type SlotResponseDTO = {
  id: string;
  startAt: Date;
  endAt: Date;
  createAt: Date;
  createById: string;
  price: number;
  reduction: number;
  type: number;
};

export type SlotCreateDTO = {
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  price: number;
  reduction: number;
  type: number;
};

export type SlotUpdateDTO = {
  id: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  price: number;
  reduction: number;
  type: number;
};
