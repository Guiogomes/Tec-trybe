// import { expect } from 'chai';
import { Types } from 'mongoose';
import { ZodError } from 'zod';
import * as sinon from 'sinon';
import { expect } from 'chai';
import ToDoModel from '../../database/models/ToDo';
import ToDoService from '../../services/ToDo';
import { ToDoSchema } from '../../interfaces/ToDoInterface';
import { sucessToDoCreated, errorToDoCreated } from './mocks';

const toDoModel = new ToDoModel();
const toDoService = new ToDoService(toDoModel);

describe('Testing ToDos Service methods', function() {
  describe('Testing create method', function() {    
    describe('Failure create method case', function() {
      before(function() {
        sinon
          .stub(ToDoSchema, 'safeParse')
          .resolves(new ZodError([]));
      });
  
      after(function() {
        (ToDoSchema.safeParse as sinon.SinonStub).restore();
      });
      it('Pass a invalid object returns an error', async function() {
        const parsed = await toDoService.create(errorToDoCreated);
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.property('error');
      });
    });

    describe('Success create method case', function() {      
      before(async function() {
        sinon
          .stub(toDoService, 'create')
          .resolves(sucessToDoCreated);
      });

      after(function() {
        (toDoService.create as sinon.SinonStub).restore();
      });
      it('Pass a valid object returns a success', async function() {
        const created = await toDoService.create(carsSuccessCreate);
        expect(created).to.be.an('object');
        expect(created).to.have.property('_id');
      });
    });
  });

  describe('Testing read method', function() {
    describe('Success read method case', function() {
      before(function() {
        sinon
          .stub(carModel, 'read')
          .resolves([carsSuccessCreateReturn] as Car[]);
      });

      after(function() {
        (carModel.read as sinon.SinonStub).restore();
      });

      it('Pass a valid object returns a success', async function() {
        const read = await toDoService.read();
        expect(read).to.be.an('array');
        expect(read).to.have.lengthOf(1);
      });
    });
  });

  describe('Testing readOne method', function() {
    describe('Failure readOne method case', function() {
      before(function() {
        sinon
          .stub(carModel, 'readOne')
          .resolves(undefined);
      });

      after(function() {
        (carModel.readOne as sinon.SinonStub).restore();
      });

      it('Pass a invalid object returns an error', async function() {
        const car = await toDoService.readOne('hauahuahauhua');
        expect(car).to.be.undefined;
      });
    });

    describe('Success readOne method case', function() {
      before(function() {
        sinon
          .stub(carModel, 'readOne')
          .resolves(carsSuccessCreateReturn);
      });

      after(function() {
        (carModel.readOne as sinon.SinonStub).restore();
      });

      it('Pass a valid object returns a success', async function() {
        const readOne = await toDoService.readOne(carsSuccessCreateReturn._id.toString());
        expect(readOne).to.be.an('object');
        expect(readOne).to.have.property('_id');
        expect(readOne).to.have.property('model');
        expect(readOne).to.have.property('year');
        expect(readOne).to.have.property('color');
        expect(readOne).to.have.property('buyValue');
        expect(readOne).to.have.property('doorsQty');
        expect(readOne).to.have.property('seatsQty');
      });
    });
  });

  describe('Testing update method', function() {
    describe('Failure update method case', function() {
      it('Pass a invalid object returns an error', async function() {
        const parsed = CarSchema.safeParse(carsErrorCreate) as ServiceError;
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.property('error');
        expect(parsed.error.issues).to.be.an('array');
      });

      it('Pass a invalid id returns a error', async function() {
        const updated = await toDoService.update('', carsSuccessCreate);
        expect(updated).to.be.null;
      });

      it('Pass a invalid id returns a error', async function() {
        const updated = await toDoService.update('hauahuahua', carsSuccessCreate);
        expect(updated).to.be.null;
      });
    });

    describe('Success update method case', function() {
      before(function() {
        sinon
          .stub(carModel, 'update')
          .resolves(carsSuccessCreateReturn);
      });

      after(function() {
        (carModel.update as sinon.SinonStub).restore();
      });

      it('Pass a valid object returns a success', async function() {
        const updated = await toDoService.update(carsSuccessCreateReturn._id.toString(), carsSuccessCreate);
        expect(updated).to.be.an('object');
        expect(updated).to.have.property('_id');
        expect(updated).to.have.property('model');
        expect(updated).to.have.property('year');
        expect(updated).to.have.property('color');
        expect(updated).to.have.property('buyValue');
        expect(updated).to.have.property('doorsQty');
        expect(updated).to.have.property('seatsQty');
      });
    });
  });

  describe('Testing delete method', function() {
    describe('Failure delete method case', function() {
      before(function() {
        sinon
          .stub(carModel, 'delete')
          .rejects(new Error('Error'));
      });

      after(function() {
        (carModel.delete as sinon.SinonStub).restore();
      });

      it('Pass a invalid object returns an error', async function() {
        try {
          await toDoService.delete('');
        } catch (error) {
          expect(error).to.be.an('error');
        }
      });
    });

    describe('Success delete method case', function() {
      before(function() {
        sinon
          .stub(carModel, 'delete')
          .resolves(carsSuccessCreateReturn);
      });

      after(function() {
        (carModel.delete as sinon.SinonStub).restore();
      });

      it('Pass a valid object returns a success', async function() {
        const deleted = await toDoService.delete(carsSuccessCreateReturn._id.toString());
        expect(deleted).to.be.an('object');
        expect(deleted).to.have.property('_id');
        expect(deleted).to.have.property('model');
        expect(deleted).to.have.property('year');
        expect(deleted).to.have.property('color');
        expect(deleted).to.have.property('buyValue');
        expect(deleted).to.have.property('doorsQty');
        expect(deleted).to.have.property('seatsQty');
      });
    });
  });
});
