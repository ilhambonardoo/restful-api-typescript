import type { Request } from "express";
import type { User } from "../generated/prisma/client";

export interface UserRequest extends Request {
  user?: User;
}
