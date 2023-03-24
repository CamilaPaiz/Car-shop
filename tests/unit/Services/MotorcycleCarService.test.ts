import { Model } from 'mongoose';
import Sinon from 'sinon';
import { expect } from 'chai';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import CarODM from '../../../src/Models/CarODM';

const modelMotorcycle = 'Honda Cb 600f Hornet';

describe('Teste das camadas Service', function () {
  const motorcycleInput : IMotorcycle = {
    
    model: modelMotorcycle,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
      
  };

  const motorcycleOutput : Motorcycle = new Motorcycle(
    {
      id: '6348513f34c397abcad040b2',
      model: modelMotorcycle,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    },
  );

  it('teste deve registrar uma moto com sucesso', async function () {
    // Action
    Sinon.stub(Model, 'create').resolves(motorcycleOutput);
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.register(motorcycleInput);
    // Assertion
    expect(result).to.be.deep.equal(motorcycleOutput);
  });
  it('teste listagem das motos com sucesso na rota /motorcycles', async function () {
    // Arrange
    const motorcycleOutputList: Motorcycle[] = [
      new Motorcycle({
        id: '634852326b35b59438fbea2f',
        model: modelMotorcycle,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      }),
      new Motorcycle({
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.900,
        category: 'Street',
        engineCapacity: 1000,
      }),
    ];
      // Action
    Sinon.stub(Model, 'find').resolves(motorcycleOutputList);
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.getAll();
    // Assertion  
    expect(result).to.be.deep.equal(motorcycleOutputList);
  });
  it('retorna null quando não encontra motos na rota  /motorcycles', async function () {
    // Action
    Sinon.stub(Model, 'find').resolves([]);
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.getAll();
    // Assertion 
    expect(result).to.be.deep.equal(null);
  });
  it('teste listagem das motos com sucesso na rota /motorcycles/:id', async function () {
    // Action
    Sinon.stub(Model, 'findById').resolves(motorcycleOutput);
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.getById('6348513f34c397abcad040b2');
    // Assertion 
    expect(result).to.be.deep.equal(motorcycleOutput);
  });
  it('retorna null na service quando o id não  é encontrado', async function () {
    // Action
    Sinon.stub(Model, 'findById').resolves(null); 
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.getById('6348513f34c397abcad040b2');
    // Assertion 
    expect(result).to.be.equal(null);
  }); 
  const carInput : ICar = {
      
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
        
  };
  
  const carOutput : Car = new Car(
    {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    },
  );
  
  it('teste deve registrar um carro com sucesso', async function () {
    // Action
    Sinon.stub(Model, 'create').resolves(carOutput);
    const service = new CarService(new CarODM());
    const result = await service.register(carInput);
    // Assertion
    expect(result).to.be.deep.equal(carOutput);
  });
  it('teste listagem dos carro com sucesso na rota /cars', async function () {
    // Arrange
    const carOutputList: Car[] = [
      new Car({
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      }),
      new Car({
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      }),
    ];
    // Action
    Sinon.stub(Model, 'find').resolves(carOutputList);
    const service = new CarService(new CarODM());
    const result = await service.getAll();
    // Assertion  
    expect(result).to.be.deep.equal(carOutputList);
  });
  it('retorna null quando não encontra carros na rota /cars', async function () {
    // Action
    Sinon.stub(Model, 'find').resolves([]);
    const service = new CarService(new CarODM());
    const result = await service.getAll();
    // Assertion 
    expect(result).to.be.deep.equal(null);
  });
  it('teste listagem dos carro com sucesso na rota /cars/:id', async function () {
    // Action
    Sinon.stub(Model, 'findById').resolves(carOutput);
    const service = new CarService(new CarODM());
    const result = await service.getById('6348513f34c397abcad040b2');
    // Assertion 
    expect(result).to.be.deep.equal(carOutput);
  });
  it('retorna null na Carservice quando o id não  é encontrado', async function () {
    // Action
    Sinon.stub(Model, 'findById').resolves(null); 
    const service = new CarService(new CarODM());
    const result = await service.getById('6348513f34c397abcad040b3');
    // Assertion 
    expect(result).to.be.equal(null);
  }); 
  /* it(' na Carservice atualiza carro', async function () {
    const carOutputUpdated : Car = new Car(
      { 
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 1992,
        color: 'Red',
        status: true,
        buyValue: 12.000,
        doorsQty: 2,
        seatsQty: 5,
      },
    );

    // Action
    Sinon.stub(Model, 'update').resolves(carOutputUpdated); 
    const service = new CarService(new CarODM());
    const result = await service.update('634852326b35b59438fbea2f', carInput);
    // Assertion 
    expect(result).to.be.equal(carOutputUpdated);
  });  */

  afterEach(function () {
    Sinon.restore();
  });
});
