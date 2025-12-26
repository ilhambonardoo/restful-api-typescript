import { prismaClient } from "../src/app/database";

export class UserTest {
  static async deleteAll() {
    await prismaClient.user.deleteMany({});
  }
  static async deleteByUsername(username: string) {
    await prismaClient.user.delete({
      where: { username },
    });
  }
}
