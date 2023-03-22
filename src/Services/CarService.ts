import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private carODM : CarODM; // recebe model

  constructor(carODM: CarODM) {
    this.carODM = carODM;
  }

  private createCarDomain(car:ICar | null): Car | null { // faz mapeamento ICar e devolve o obj tipo Car
    if (car) {
      return new Car(
        car,
      );
    }
    return null;
  }

  public async register(car:ICar) {
    const newCar = await this.carODM.create(car);
    return this.createCarDomain(newCar);
  }
}

export default CarService; 