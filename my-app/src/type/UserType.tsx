import { type } from "@testing-library/user-event/dist/type";

export type SiginupUser = {
  name: string;
  email: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type UserName = {
  name: string;
};
