import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar'; 
import CarService from '../Services/CarService';

class CarController {
  private service :CarService;
  constructor(service: CarService) {
    this.service = service;
  }

  public async create(req:Request, res:Response, next: NextFunction) {
    const car : ICar = {
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      status: req.body.status,
      buyValue: req.body.buyValue,
      doorsQty: req.body.doorsQty,
      seatsQty: req.body.seatsQty,   
    };
    try {
      const newCar = await this.service.register(car);
      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }

  public async findAll(_req:Request, res:Response) {
    const car = await this.service.getAll();
    return res.status(200).json(car);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const car = await this.service.getById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    return res.status(200).json(car);
  }

  public async update(req:Request, res:Response) {
    const { id } = req.params;
    const car = await this.service.getById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    } 
    const obj = { ...req.body };
    const updatedCar = await this.service.update(id, obj);
    return res.status(200).json(updatedCar);
  }
}

export default CarController;