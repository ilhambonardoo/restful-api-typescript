import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { type Contact, type User } from "../generated/prisma/client";
import {
  toContactResponse,
  type ContactResponse,
  type CreateContactRequest,
  type SearchContactRequest,
  type UpdateContactRequest,
} from "../model/contact-model";
import type { Pageable } from "../model/page";
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

  static async remove(user: User, id: number): Promise<ContactResponse> {
    await this.checkContactMustExists(user.username, id);

    const contact = await prismaClient.contact.delete({
      where: {
        id: id,
        username: user.username,
      },
    });

    return toContactResponse(contact);
  }

  static async search(
    user: User,
    request: SearchContactRequest
  ): Promise<Pageable<ContactResponse>> {
    const searchRequest = Validation.validate(ContactValidaton.SEARCH, request);
    const skip = (searchRequest.page - 1) * searchRequest.size;

    const filters = [];
    // check if name exists
    if (searchRequest.name) {
      filters.push({
        OR: [
          {
            first_name: {
              contains: searchRequest.name,
            },
          },
          {
            last_name: {
              contains: searchRequest.name,
            },
          },
        ],
      });
    }
    // check if email exists
    if (searchRequest.email) {
      filters.push({
        email: {
          contains: searchRequest.email,
        },
      });
    }
    // check if phone exists
    if (searchRequest.phone) {
      filters.push({
        phone: {
          contains: searchRequest.phone,
        },
      });
    }

    const contacts = await prismaClient.contact.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });

    return {
      data: contacts.map((contact) => toContactResponse(contact)),
      pagging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        total_item: searchRequest.size,
      },
    };
  }
}
