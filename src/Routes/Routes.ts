import { Router } from 'express';
import CarsController from '../Controllers/CarController';
import CarODM from '../Models/CarODM';
import CarService from '../Services/CarService';
import validateMongoId from '../Middlewares/IdValidation';

const routes = Router();
const service = new CarService(
  new CarODM(),
);
const carController = new CarsController(service);

routes.post('/cars', (req, res, next) => carController.create(req, res, next));
routes.get('/cars', (req, res) => carController.findAll(req, res));
routes.get('/cars/:id', validateMongoId, (req, res) => carController.findById(req, res));
routes.put('/cars/:id', validateMongoId, (req, res) => carController.update(req, res));
export default routes; 