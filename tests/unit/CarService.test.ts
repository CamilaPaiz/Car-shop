import { Model } from 'mongoose';
import Sinon from 'sinon';
import { expect } from 'chai';
import Car from '../../src/Domains/Car';
import ICar from '../../src/Interfaces/ICar';
import CarService from '../../src/Services/CarService';
import CarODM from '../../src/Models/CarODM';

describe('Teste da camada CarService', function () {
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
  it('retorna null na service quando o id não  é encontrado', async function () {
    // Action
    Sinon.stub(Model, 'findById').resolves(null); 
    const service = new CarService(new CarODM());
    const result = await service.getById('6348513f34c397abcad040b3');
    // Assertion 
    expect(result).to.be.equal(null);
  }); 
  afterEach(function () {
    Sinon.restore();
  });
});