import { Request } from "express"

export interface IGetUserAuthInfoRequest extends Request {
  user?: { id: string }; // or any other type
}