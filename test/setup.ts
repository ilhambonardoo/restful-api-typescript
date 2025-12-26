import { prismaClient } from "../src/app/database";

beforeAll(async () => {
  await prismaClient.user.deleteMany();
});

afterAll(async () => {
  await prismaClient.user.deleteMany({});
  await prismaClient.$disconnect();
});
