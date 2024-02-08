import { HttpException } from '../exceptions';
import { NextFunction, Request, Response } from 'express';
declare function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction): void;
export { errorMiddleware };
