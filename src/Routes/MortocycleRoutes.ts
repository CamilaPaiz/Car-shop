import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import MotorcycleODM from '../Models/MotorcycleODM';
import MotorcycleService from '../Services/MotorcycleService';
import validateMongoId from '../Middlewares/IdValidation';

const motorcycleRoutes = Router();
const service = new MotorcycleService(
  new MotorcycleODM(),
);
const motorcycleController = new MotorcycleController(service);

motorcycleRoutes.post('/motorcycles', (req, res, next) => motorcycleController
  .create(req, res, next));
motorcycleRoutes.get('/motorcycles', (req, res) => motorcycleController.findAll(req, res));
motorcycleRoutes.get('/motorcycles/:id', validateMongoId, (req, res) => motorcycleController
  .findById(req, res)); 
motorcycleRoutes.put('/motorcycles/:id', validateMongoId, (req, res) => motorcycleController
  .update(req, res));
export default motorcycleRoutes;  