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

export type BookType = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: true;
};

export type PostBook = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

export type UserName = {
  name: string;
};
