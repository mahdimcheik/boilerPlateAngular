export type FormationCreateDTO = {
  title: string;
  company: string;
  dateBegin: string;
  dateEnd: string;
  city: string;
  country: string;
};

export type FormationResponseDTO = {
  id: string;
  title: string;
  company: string;
  dateBegin: string;
  dateEnd: string;
  city: string;
  country: string;
};
