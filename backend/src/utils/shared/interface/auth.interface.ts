import { Request } from "express";

export type AuthUser = {
    email: string;
    role: string;
  };
export interface AuthRequest extends Request {
    user: AuthUser;
  }