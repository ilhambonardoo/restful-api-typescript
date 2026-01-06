import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";

describe("POST /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
    await ContactTest.deleteAll();
    await AddressTest.deleteAll();
  });

  it("should be able to create address", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan belum ada",
        city: "Jakarta",
        province: "DKI JAKARTA",
        country: "Indonesia",
        postal_code: "12321",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.street).toBe("Jalan belum ada");
    expect(response.body.data.city).toBe("Jakarta");
    expect(response.body.data.province).toBe("DKI JAKARTA");
    expect(response.body.data.country).toBe("Indonesia");
    expect(response.body.data.postal_code).toBe("12321");
  });

  it("should reject create new address if request is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan belum ada",
        city: "Jakarta",
        province: "DKI JAKARTA",
        country: "",
        postal_code: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create new address if contact is not found", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .post(`/api/contacts/${contact.id + 1}/addresses`)
      .set("X-API-TOKEN", "test")
      .send({
        street: "Jalan belum ada",
        city: "Jakarta",
        province: "DKI JAKARTA",
        country: "Indonesia",
        postal_code: "123512",
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});
