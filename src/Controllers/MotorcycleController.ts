import { NextFunction, Request, Response } from 'express';
/* import { isValidObjectId } from 'mongoose'; */
import IMotorcycle from '../Interfaces/IMotorcycle'; 
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private service :MotorcycleService;
  constructor(service: MotorcycleService) {
    this.service = service;
  }

  public async create(req:Request, res:Response, next: NextFunction) {
    const motorcycle : IMotorcycle = {
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      status: req.body.status,
      buyValue: req.body.buyValue,
      category: req.body.category,
      engineCapacity: req.body.engineCapacity,   
    };
    try {
      const newMotorcycle = await this.service.register(motorcycle);
      return res.status(201).json(newMotorcycle);
    } catch (error) {
      next(error);
    }
  }
}

export default MotorcycleController;