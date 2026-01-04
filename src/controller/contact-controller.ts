import { response, type NextFunction, type Response } from "express";
import type { UserRequest } from "../types/user-request";
import type {
  CreateContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
} from "../model/contact-model";
import { ContactService } from "../service/contact-service";

export class ContactController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateContactRequest = req.body as CreateContactRequest;
      const response = await ContactService.create(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = Number(req.params.contactId);
      const response = await ContactService.get(req.user!, contactId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateContactRequest = req.body as UpdateContactRequest;
      request.id = Number(req.params.contactId);
      const response = await ContactService.update(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = Number(req.params.contactId);
      await ContactService.remove(req.user!, contactId);
      res.status(200).json({
        data: "OK",
      });
    } catch (error) {
      next(error);
    }
  }

  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: SearchContactRequest = {
        name: req.query.name as string,
        email: req.query.email as string,
        phone: req.query.phone as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      const response = await ContactService.search(req.user!, request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
