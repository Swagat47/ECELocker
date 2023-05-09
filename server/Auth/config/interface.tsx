import { Document } from "mongoose";

export interface ICompanyUserRelation extends Document {
  user_id: string;
  company_id: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  _doc: object;
}

export interface ICompany extends Document {
  name: string;
  ctc: string;
  location: string;
  cluster: number;
  branches: string[];
  cgpa: number;
  percentage10: number;
  percentage12: number;
  description: string;
  role: string;
  deadline: string;
}

export interface INewUser {
  name: string;
  email: string;
  password: string;
}

export interface IDecodedToken {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}

export interface INotice extends Document {
  name: string;
  docId: string;
}

export interface IResume extends Document {
  name: string;
  docId: string;
}

export interface IAvatar extends Document {
  name: string;
  docId: string;
}

export interface IStatistics extends Document {
  name: string;
  email: string;
  branch: string;
  company: string;
  ctc: string;
  year: number;
  cluster: number;
}
