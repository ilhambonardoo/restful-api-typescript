import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { type Contact, type User } from "../generated/prisma/client";
import {
  toContactResponse,
  type ContactResponse,
  type CreateContactRequest,
  type UpdateContactRequest,
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

  static async checkContactMustExists(
    username: string,
    id: number
  ): Promise<Contact> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: id,
        username: username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact not found");
    }

    return contact;
  }

  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustExists(user.username, id);
    return toContactResponse(contact);
  }

  static async update(
    user: User,
    request: UpdateContactRequest
  ): Promise<ContactResponse> {
    const updateRequest = Validation.validate(ContactValidaton.UPDATE, request);
    await this.checkContactMustExists(user.username, updateRequest.id);

    const contact = await prismaClient.contact.update({
      where: {
        id: updateRequest.id,
        username: user.username,
      },
      data: updateRequest,
    });

    return toContactResponse(contact);
  }
}
