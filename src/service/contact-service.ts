import { prismaClient } from "../app/database";
import { type User } from "../generated/prisma/client";
import {
  toContactResponse,
  type ContactResponse,
  type CreateContactRequest,
} from "../model/contact-model";
import { ContactValidaton } from "../validation/contact-validation";
import { Validation } from "../validation/validation";

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = Validation.validate(ContactValidaton.CREATE, request);

    const record = {
      ...createRequest,
      ...{ username: user.username },
    };
    const contact = await prismaClient.contact.create({
      data: record,
    });

    return toContactResponse(contact);
  }
}
