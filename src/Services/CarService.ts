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
  public async getAll(): Promise<Car[] | null> {
    const cars = await this.carODM.findAll();
    if (cars === null) {
      return null; 
    }
  
    const domainCars = cars.map((car) => new Car(
      car,
    ));
  
    return domainCars;
  }
  
  public async getById(id: string): Promise<Car | null> {
    const car = await this.carODM.findById(id);
    return this.createCarDomain(car);
  }

  public async update(id :string, obj: ICar): Promise<Car | null> {
    /*     const car = await this.carODM.findById(id);
    console.log('service', car);
    if (!car) {
      return null;
    } */
    const carUpdated = await this.carODM.update(id, obj);
    console.log('service update', carUpdated);
    return this.createCarDomain(carUpdated);
  }   
}

export default CarService; 