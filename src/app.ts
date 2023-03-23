import express from 'express';
import routes from './Routes/Routes';
import ErrorHandler from './Middlewares/ErrorHandler';
import motorcycleRoutes from './Routes/MortocycleRoutes';

const app = express();
app.use(express.json()); 
app.use(routes);
app.use(motorcycleRoutes);
app.use(ErrorHandler.handle);

export default app;
