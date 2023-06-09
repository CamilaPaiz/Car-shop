import IMotorcycle from '../Interfaces/IMotorcycle';

class Motorcycle {
  protected id:string | undefined;
  protected model: string;
  protected year: number;
  protected status: boolean;
  protected color: string;
  protected buyValue: number;
  private category: string;
  private engineCapacity: number;

  constructor(
    motorcycle : IMotorcycle,
  ) {
    this.id = motorcycle.id;
    this.model = motorcycle.model;
    this.year = motorcycle.year;
    this.color = motorcycle.color;
    this.status = motorcycle.status || false;
    this.buyValue = motorcycle.buyValue;
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }
}
export default Motorcycle;