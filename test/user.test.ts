import supertest from "supertest";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";
import { UserTest } from "./test-util";

describe("POST /api/users/", () => {
  afterEach(async () => {
    await UserTest.delete();
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
      username: "test",
      password: "",
      name: "Test User",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  test("should reject register new user if name is empty", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "password123",
      name: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  test("should accept when register add user success", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "password123",
      name: "Test User",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("Test User");
  });

  test("should reject duplicate username", async () => {
    await supertest(web).post("/api/users").send({
      username: "test",
      password: "password123",
      name: "Test User",
    });

    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "password456",
      name: "Another User",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  test("should not return password in response", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "password123",
      name: "Test User",
    });

    expect(response.status).toBe(200);
    expect(response.body.data.password).toBeUndefined();
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => await UserTest.create());

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to login", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.token).toBeDefined();
  });

  it("should reject login if username wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "ea",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject login if password wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "ea",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to get user", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });

  it("should be reject get user if token is invalide", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "salah");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
