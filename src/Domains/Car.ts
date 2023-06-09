import ICar from '../Interfaces/ICar';

class Car {
  protected id:string | undefined;
  protected model: string;
  protected year: number;
  protected status: boolean;
  protected color: string;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(
    car: ICar,
  ) {
    this.id = car.id;
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.status = car.status || false;
    this.buyValue = car.buyValue;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
}
export default Car;