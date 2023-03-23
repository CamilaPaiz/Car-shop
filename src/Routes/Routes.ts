import { Router } from 'express';
import CarsController from '../Controllers/CarController';
import CarODM from '../Models/CarODM';
import CarService from '../Services/CarService';

const routes = Router();
const service = new CarService(
  new CarODM(),
);
const carController = new CarsController(service);

routes.post('/cars', (req, res, next) => carController.create(req, res, next));
routes.get('/cars', (req, res) => carController.findAll(req, res));
routes.get('/cars/:id', (req, res) => carController.findById(req, res));
 
export default routes; 