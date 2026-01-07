import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import type { User } from "../generated/prisma/client";
import {
  toAddressResponse,
  type AddressResponse,
  type CreateAddressRequest,
  type GetAddressRequest,
} from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { Validation } from "../validation/validation";
import { ContactService } from "./contact-service";

export class AddressService {
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    const createRequest = Validation.validate(
      AddressValidation.CREATE,
      request
    );

    await ContactService.checkContactMustExists(
      user.username,
      request.contact_id
    );

    const address = await prismaClient.address.create({
      data: createRequest,
    });

    return toAddressResponse(address);
  }

  static async get(
    user: User,
    request: GetAddressRequest
  ): Promise<AddressResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request);

    await ContactService.checkContactMustExists(
      user.username,
      request.contact_id
    );

    const address = await prismaClient.address.findFirst({
      where: {
        id: getRequest.id,
        contact_id: getRequest.contact_id,
      },
    });

    if (!address) {
      throw new ResponseError(404, "Address is not found");
    }

    return toAddressResponse(address);
  }
}
