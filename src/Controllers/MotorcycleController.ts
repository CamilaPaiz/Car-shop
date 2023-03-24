import { NextFunction, Request, Response } from 'express';
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
  public async findAll(_req:Request, res:Response) {
    const motorcycle = await this.service.getAll();
    return res.status(200).json(motorcycle);
  }
  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const motorcycle = await this.service.getById(id);
    if (!motorcycle) {
      return res.status(404).json({ message: 'Motorcycle not found' });
    }
    return res.status(200).json(motorcycle);
  }
  public async update(req:Request, res:Response) {
    const { id } = req.params;
    const motorcycle = await this.service.getById(id);
    if (!motorcycle) {
      return res.status(404).json({ message: 'Motorcycle not found' });
    } 
    const obj = { ...req.body };
    const updatedMotorcycle = await this.service.update(id, obj);
    return res.status(200).json(updatedMotorcycle);
  }
}

export default MotorcycleController;