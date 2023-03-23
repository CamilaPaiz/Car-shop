import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';

async function validateMongoId(req:Request, res: Response, next:NextFunction): Promise<void> {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(422).json({ message: 'Invalid mongo id' });
    return;
  }
  next();
}

export default validateMongoId;