import supertest from "supertest";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";
import { UserTest, ContactTest } from "./test-util";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  // Success
  it("should success create contact with all fields", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "Ilham",
        last_name: "Bonardo",
        email: "ilhambonardo@example.com",
        phone: "089610319939",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("Ilham");
    expect(response.body.data.last_name).toBe("Bonardo");
    expect(response.body.data.email).toBe("ilhambonardo@example.com");
    expect(response.body.data.phone).toBe("089610319939");
  });

  it("should success create contact with required fields only", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "John",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("John");
    expect(response.body.data.last_name).toBeNull();
    expect(response.body.data.email).toBeNull();
    expect(response.body.data.phone).toBeNull();
  });

  it("should success create contact with first_name and last_name", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "John",
        last_name: "Doe",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.first_name).toBe("John");
    expect(response.body.data.last_name).toBe("Doe");
    expect(response.body.data.email).toBeNull();
    expect(response.body.data.phone).toBeNull();
  });

  it("should success create contact with first_name and email", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "Jane",
        email: "jane@example.com",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.first_name).toBe("Jane");
    expect(response.body.data.last_name).toBeNull();
    expect(response.body.data.email).toBe("jane@example.com");
    expect(response.body.data.phone).toBeNull();
  });

  it("should success create multiple contacts", async () => {
    const response1 = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "Contact1",
        email: "contact1@example.com",
      });

    const response2 = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "Contact2",
        email: "contact2@example.com",
      });

    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response1.body.data.id).not.toBe(response2.body.data.id);
    expect(response1.body.data.first_name).toBe("Contact1");
    expect(response2.body.data.first_name).toBe("Contact2");
  });

  // Validation Error Cases
  it("should reject create contact if first_name is empty", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "Doe",
        email: "john@example.com",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create contact if first_name is missing", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        last_name: "Doe",
        email: "john@example.com",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create contact if first_name exceeds max length", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "a".repeat(101),
        last_name: "Doe",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create contact if last_name exceeds max length", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "John",
        last_name: "a".repeat(101),
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create contact if email exceeds max length", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "John",
        email: "a".repeat(101) + "@example.com",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create contact if phone exceeds max length", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "John",
        phone: "1".repeat(21),
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create contact if last_name is empty string", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "John",
        last_name: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create contact if email is empty string", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "John",
        email: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create contact if phone is empty string", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "John",
        phone: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  // Authentication Error Cases
  it("should reject create contact if token is missing", async () => {
    const response = await supertest(web).post("/api/contacts").send({
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create contact if token is invalid", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "invalid-token")
      .send({
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create contact if token is empty", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "")
      .send({
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should be abel to get contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe(contact.first_name);
    expect(response.body.data.last_name).toBe(contact.last_name);
    expect(response.body.data.email).toBe(contact.email);
    expect(response.body.data.phone).toBe(contact.phone);
  });

  it("should reject get contact if contact is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
  });
});
