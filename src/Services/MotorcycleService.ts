import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private motorcycleODM : MotorcycleODM;

  constructor(motorcycleODM: MotorcycleODM) {
    this.motorcycleODM = motorcycleODM;
  }
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(
        motorcycle,
      );
    }
    return null;
  }

  public async register(motorcycle: IMotorcycle) {
    const newMotorcycle = await this.motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }
  public async getAll(): Promise<Motorcycle[] | null> { 
    const motorcycles = await this.motorcycleODM.findAll();
    if (motorcycles.length === 0) {
      return null; 
    }
  
    const domainCars = motorcycles.map((motorcycle) => new Motorcycle(
      motorcycle,
    ));
  
    return domainCars;
  }

  public async getById(id: string): Promise<Motorcycle | null> {
    const motorcycle = await this.motorcycleODM.findById(id);
    return this.createMotorcycleDomain(motorcycle);
  }
  
  public async update(id :string, obj: IMotorcycle): Promise<Motorcycle | null> {
    const motorcycleUpdated = await this.motorcycleODM.update(id, obj);
    
    return this.createMotorcycleDomain(motorcycleUpdated);
  }   
}

export default MotorcycleService;
