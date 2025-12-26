import supertest from "supertest";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";
import { UserTest } from "./test-util";

describe("User Registration", () => {
  afterEach(async () => {
    await UserTest.deleteAll();
  });

  test("should reject register new user if username is empty", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      password: "password123",
      name: "Test User",
    });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  test("should reject register new user if password is empty", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "testuser",
      password: "",
      name: "Test User",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  test("should reject register new user if name is empty", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "testuser",
      password: "password123",
      name: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  test("should accept when register add user success", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "testuser",
      password: "password123",
      name: "Test User",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.username).toBe("testuser");
    expect(response.body.data.name).toBe("Test User");
  });

  test("should reject duplicate username", async () => {
    await supertest(web).post("/api/users").send({
      username: "testuser",
      password: "password123",
      name: "Test User",
    });

    const response = await supertest(web).post("/api/users").send({
      username: "testuser",
      password: "password456",
      name: "Another User",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  test("should not return password in response", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "testuser",
      password: "password123",
      name: "Test User",
    });

    expect(response.status).toBe(200);
    expect(response.body.data.password).toBeUndefined();
  });
});
