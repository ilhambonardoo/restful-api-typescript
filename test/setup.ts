import { prismaClient } from "../src/app/database";

beforeAll(async () => {
  await prismaClient.address.deleteMany();
  await prismaClient.contact.deleteMany();
  await prismaClient.user.deleteMany();
});

afterAll(async () => {
  await prismaClient.address.deleteMany();
  await prismaClient.contact.deleteMany();
  await prismaClient.user.deleteMany();
  await prismaClient.$disconnect();
});
