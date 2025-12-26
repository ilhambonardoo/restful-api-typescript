import type { User } from "../generated/prisma/client";

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
};

export type CreateUserRequest = {
  username: string;
  password: string;
  name: string;
};

export function toUserResponse(user: User) {
  return {
    username: user.username,
    name: user.name,
  };
}
