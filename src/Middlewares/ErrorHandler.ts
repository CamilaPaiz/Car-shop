import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  public static handle(error: Error, _req:Request, res: Response, next:NextFunction) {
    if (error instanceof Error && error.stack) {
      res.status(parseInt(error.stack, 10)).json({ message: error.message });
    }
    
    next();
  }
}

export default ErrorHandler;